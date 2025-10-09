import { PrismaClient as PrismaClientPostgres } from "../db/generated/prisma-postgres/index.js";
import env from "../config/index.js";

// It is recommended to use a connection pooler to manage database connections efficiently
// Avoid instantiating PrismaClient globally in long lived environments
// Instead create and dispose of the client per request to prevent exhausting db connections

const getPrisma = () =>
  new PrismaClientPostgres({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof getPrisma>;
};

const prisma = globalForPrisma.prisma || getPrisma();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;
