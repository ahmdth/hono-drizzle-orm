import { faker } from "@faker-js/faker"
import { db } from "."
import { user } from "./schema.ts"

(async () => {
  try {
    console.log('Start seeding 🎁')
    await db.delete(user)
    for (let i = 0; i < 100; i++) {
      await db.insert(user)
        .values({ id: faker.string.uuid(), name: faker.person.fullName(), email: faker.internet.email(), image: faker.image.urlLoremFlickr(), emailVerified: faker.datatype.boolean() })
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    console.log('seeding finished 🎉')
    process.exit(0)
  }
})()