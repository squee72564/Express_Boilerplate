import express, { type Router } from "express";
import userController from "../../controllers/user.controller.js";
import userValidations from "../../validations/user.validations.js";
import validate from "../../middleware/validate.js";
import auth from "../../middleware/auth.js";

const router: Router = express.Router();

router
  .route("/")
  .get(auth(["user"]), validate(userValidations.listUsers), userController.listUsers);

router
  .route("/:id")
  .get(auth(["user"]), validate(userValidations.getUserById), userController.getUserById);

export default router;
