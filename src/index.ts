import "dotenv/config";
import { Hono, type Context } from "hono";
import { logger } from "hono/logger"
import { user } from "./db/schema.ts";
import { auth } from "./lib/auth";
import { db } from "./db";
import { cors } from "hono/cors";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(logger())
app.get("/users", async (ctx: Context) => {
  let { page, take } = ctx.req.queries()
  if (!take) take = ["10"];
  const users = await db.select().from(user).offset(Number(page) * 10).limit(Number(take))
  return ctx.json({ users })
})

app.use('/api/*', cors())

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

export default {
  port: 3000,
  fetch: app.fetch,
};
