import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware(async (c, next) => {
  const user = c.get("user")
  const session = c.get("session")
  if (!user || !session) return c.json({ msg: "Unauthorized" }, 401)
  await next()
})