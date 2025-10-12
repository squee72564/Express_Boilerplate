import express, { type Router } from "express";
import userController from "../../controllers/user.controller.js";
import userValidations from "../../validations/user.validations.js";
import validate from "../../middleware/validate.js";
import auth from "../../middleware/auth.js";

const router: Router = express.Router();

router
  .route("/self")
  .get(
    auth(["user"]),
    validate(userValidations.getUserWithSession),
    userController.getUserWithSession
  );

router
  .route("/:id")
  .get(
    auth(["user"], { user: ["listPublicUsers"] }),
    validate(userValidations.getUserById),
    userController.getPublicUserById
  );

router
  .route("/")
  .get(
    auth(["user"], { user: ["listPublicUsers"] }),
    validate(userValidations.listPublicUsers),
    userController.listPublicUsers
  );

export default router;
