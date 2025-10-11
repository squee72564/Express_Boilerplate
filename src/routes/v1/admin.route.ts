import { Router } from "express";
import auth from "../../middleware/auth.js";
import validate from "../../middleware/validate.js";
import adminValidations from "../../validations/admin.validations.js";
import adminController from "../../controllers/admin.controller.js";

const router: Router = Router();

const userRoutes: Router = Router({ mergeParams: true });

userRoutes
  .route("/")
  .patch(
    auth(["admin"], { user: ["create"] }),
    validate(adminValidations.UpdateUserRequestSchema),
    adminController.updateUser
  )
  .delete(
    auth(["admin"], { user: ["delete"] }),
    validate(adminValidations.RemoveUserRequestSchema),
    adminController.removeUser
  );

userRoutes.patch(
  "/role",
  auth(["admin"], { user: ["set-role"] }),
  validate(adminValidations.SetUserRoleRequestSchema),
  adminController.setUserRole
);

userRoutes.patch(
  "/password",
  auth(["admin"], { user: ["set-password"] }),
  validate(adminValidations.SetUserPasswordRequestSchema),
  adminController.setUserPassword
);

userRoutes.patch(
  "/ban",
  auth(["admin"], { user: ["ban"] }),
  validate(adminValidations.BanUserRequestSchema),
  adminController.banUser
);

userRoutes.patch(
  "/unban",
  auth(["admin"], { user: ["ban"] }),
  validate(adminValidations.UnbanUserRequestSchema),
  adminController.unbanUser
);

userRoutes.get(
  "/sessions",
  auth(["admin"], { session: ["list"] }),
  validate(adminValidations.ListUserSessionsRequestSchema),
  adminController.listUserSession
);

userRoutes.delete(
  "/sessions",
  auth(["admin"], { session: ["revoke"] }),
  validate(adminValidations.RevokeAllUserSessionRequestSchema),
  adminController.revokeAllUserSessions
);

userRoutes.delete(
  "/sessions/:sessionToken",
  auth(["admin"], { session: ["revoke"] }),
  validate(adminValidations.RevokeUserSessionRequestSchema),
  adminController.revokeUserSession
);

userRoutes.post(
  "/impersonate",
  auth(["admin"], { user: ["impersonate"] }),
  validate(adminValidations.ImpersonateUserRequestSchema),
  adminController.impersonateUser
);

userRoutes.delete(
  "/impersonate",
  auth(["admin"], { user: ["impersonate"] }),
  validate(adminValidations.StopImpersonatingRequestSchema),
  adminController.stopImpersonatingUser
);

router.use("/users/:userId", userRoutes);

router
  .route("/users")
  .get(
    auth(["admin"], { user: ["list"] }),
    validate(adminValidations.ListUserRequestSchema),
    adminController.listUsers
  )
  .post(
    auth(["admin"], { user: ["create"] }),
    validate(adminValidations.CreateUserRequestSchema),
    adminController.createUser
  );

export default router;
