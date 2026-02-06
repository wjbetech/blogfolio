import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * PrismaClient singleton for Next.js / serverless environments.
 * Avoids creating new clients on every module reload in development.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });
};

let prismaInstance: PrismaClient | null = null;

const getPrismaClient = (): PrismaClient => {
  if (!prismaInstance) {
    prismaInstance = global.prisma ?? createPrismaClient();

    if (process.env.NODE_ENV !== "production") {
      global.prisma = prismaInstance;
    }
  }

  return prismaInstance;
};

export const prisma = getPrismaClient();

export default prisma;
