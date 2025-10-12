import type { Response } from "express";

import catchAsync from "../utils/catchAsync.js";
import { userService } from "../services/index.js";
import { ListUserRequest } from "@/types/admin.types.ts";
import { GetUserRequest } from "@/types/user.types.ts";

const getUserById = catchAsync(async (req: GetUserRequest, res: Response) => {
  const args = { ...req.query };

  const user = await userService.getUserById(args, req);
  res.status(200).json(user);
});

const listUsers = catchAsync(async (req: ListUserRequest, res: Response) => {
  const args = { ...req.body };

  const users = await userService.listUsers(args, req);
  res.status(200).json(users);
});

export default {
  getUserById: getUserById,
  listUsers: listUsers,
};
