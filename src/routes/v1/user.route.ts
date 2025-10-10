import express, { type Router } from "express";
import userController from "../../controllers/user.controller.js";
import userValidations from "../../validations/user.validations.js";
import validate from "../../middleware/validate.js";
import auth from "../../middleware/auth.js";

const router: Router = express.Router();

router.route("/").get(auth(), validate(userValidations.getAllUsers), userController.getAllUsers);

router.route("/:id").get(auth(), validate(userValidations.getUserById), userController.getUserById);

export default router;
