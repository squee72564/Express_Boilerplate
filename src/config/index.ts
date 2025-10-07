import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

const envFile =
  process.env.NODE_ENV === "development"
    ? path.resolve(process.cwd(), ".env.development")
    : path.resolve(process.cwd(), ".env");

dotenv.config({ path: envFile });

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
});

const env = envSchema.parse(process.env);

export default env;
