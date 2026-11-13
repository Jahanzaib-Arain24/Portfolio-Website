import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const edu = await prisma.education.findFirst({ where: { degree: { contains: "Matriculation" } } });
  if (edu) {
    await prisma.education.update({
      where: { id: edu.id },
      data: { institution: "Shaheen Public High School" }
    });
    console.log("Updated Matriculation institution to Shaheen Public High School!");
  }
}

main().catch(console.error).finally(() => process.exit(0));

