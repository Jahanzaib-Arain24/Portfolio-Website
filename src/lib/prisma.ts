import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Automatically resolve SQLite file path in Vercel Serverless / production runtime
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith("file:")) {
  const prismaDb = path.join(process.cwd(), "prisma", "dev.db");
  const rootDb = path.join(process.cwd(), "dev.db");

  if (fs.existsSync(prismaDb)) {
    process.env.DATABASE_URL = `file:${prismaDb}`;
  } else if (fs.existsSync(rootDb)) {
    process.env.DATABASE_URL = `file:${rootDb}`;
  }
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
