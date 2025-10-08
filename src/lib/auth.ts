import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";
import env from "../config/index.js";

const database =
  env.NODE_ENV === "production"
    ? prismaAdapter(prisma, { provider: "postgresql" })
    : prismaAdapter(prisma, { provider: "sqlite" });

export const auth = betterAuth({
  database: database,
  // Other sign-in methods: https://www.better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
  },
  // Example for provider like github
  //socialProdivers: {
  //  github: {
  //    clientId: env.GITHUB_CLIENT_ID as string,
  //    clientSecret: env.GITHUB_CLIENT_SECRET as string,
  //  }
  //}
});
