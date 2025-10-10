import type { Session, User } from "better-auth"; // or whatever your session type is

declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace Express {
    interface Request {
      session?: Session; // or your custom shape
      user?: User;
    }
  }
}

export {}; // Ensure this file is treated as a module
