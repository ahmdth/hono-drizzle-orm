import { migrate } from "drizzle-orm/postgres-js/migrator"
import { db } from "."

(async () => {
  await migrate(db, {
    migrationsFolder: '../../drizzle'
  })
})()