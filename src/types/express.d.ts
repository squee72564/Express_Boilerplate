import type { Session, User } from "better-auth"; // or whatever your session type is

declare global {
  namespace Express {
    interface Request {
      session?: Session; // or your custom shape
      user?: User;
    }
  }
}
