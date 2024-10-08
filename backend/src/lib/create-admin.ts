import database from "@/lib/database";
import env from "@/lib/env";
import users from "@/schemas/user";
import { genSalt, hash } from "bcrypt";
import { eq } from "drizzle-orm";

export default async function createAdmin() {
  const adminUsername = env.ADMIN_USERNAME ?? "";
  const adminPassword = env.ADMIN_PASSWORD ?? "";

  const result = await database
    .select()
    .from(users)
    .where(eq(users.username, adminUsername))
    .limit(1);

  const adminFound = result[0];

  if (!adminFound) {
    const passwordSalt = await genSalt(2048);
    const passwordHash = await hash(adminPassword, passwordSalt);

    await database.insert(users).values({
      username: adminUsername,
      password: passwordHash,
      idNumber: "0000000000000",
      accountNumber: "0000000000",
      fullName: "Charos Administrator",
      role: "system_admin",
    });

    console.log(
      "✅ Created admin user: " +
        adminUsername +
        " and password " +
        adminPassword
    );
  }
}
