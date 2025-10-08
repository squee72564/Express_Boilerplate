import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";

const database = prismaAdapter(prisma, { provider: "postgresql" });

export const auth = betterAuth({
  database: database,
  // Other sign-in methods: https://www.better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
  },

  // https://www.better-auth.com/docs/guides/optimizing-for-performance#database-optimizations
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  // Example for provider like github / google
  //socialProdivers: {
  //  github: {
  //    clientId: env.GITHUB_CLIENT_ID as string,
  //    clientSecret: env.GITHUB_CLIENT_SECRET as string,
  //  },
  //  google: {
  //    clientId: env.GOOGLE_CLIENT_ID as string,
  //    clientSecret: env.GOOGLE_CLIENT_SECRET as string,
  //  },
  //}
});
