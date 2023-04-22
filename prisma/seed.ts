import { hash } from "bcrypt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  const password = await hash('yuumi', 12)
  const user = await prisma.user.upsert({
    where: { username: "zay" },
    update: { name: "zay"},
    create: {
      username: "zay",
      name: "zay",
      password
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })