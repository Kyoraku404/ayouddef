import { prisma } from "../lib/db";
import { hashPassword } from "../lib/auth";

async function main() {
  const users = await prisma.zakyUser.findMany();
  console.log("Existing zaky users:", users.map(u => ({ id: u.id, username: u.username })));

  // Ensure zaky user exists with password123 and YourSecurePassword123!
  const passwordHash = await hashPassword("password123");
  const upserted = await prisma.zakyUser.upsert({
    where: { username: "zaky" },
    update: { password: passwordHash },
    create: {
      username: "zaky",
      password: passwordHash,
    },
  });
  console.log("Upserted zaky user successfully with password123:", upserted.username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
