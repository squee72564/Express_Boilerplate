import { Router } from "express";

const router: Router = Router();

const userRoutes: Router = Router({ mergeParams: true });

userRoutes
  .route("/")
  .patch() // update user
  .delete(); // remove user

userRoutes.patch("/role"); // set user role

userRoutes.patch("/password"); // set user password

userRoutes.patch("/ban"); // ban user
userRoutes.patch("/unban"); // unban user

userRoutes.get("/sessions"); // list user sessions
userRoutes.delete("/sessions"); // revoke all sessions
userRoutes.delete("/sessions/:sessionToken");

userRoutes.post("/impersonate"); // impersonate
userRoutes.delete("impersonate"); // stop impersonate

router.use("/users/:userId", userRoutes);

router
  .route("/users")
  .get() // list users
  .post(); // create user

export default router;
