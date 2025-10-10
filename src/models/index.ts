import {
  User,
  Session,
  Post,
  Account,
  Verification,
} from "../db/generated/prisma-postgres/index.js";

// The generated prisma client creates types for each model in the schema.prisma file.
// You can export them here for easy access throughout your codebase.

// If you add new models to your schema.prisma file, remember to run `npx prisma generate`
// to update the generated client and then add the new models to this export list.

export type { User, Session, Account, Verification, Post };
