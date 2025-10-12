import type { Response } from "express";

import catchAsync from "../utils/catchAsync.js";
import { userService } from "../services/index.js";
import {
  GetUserRequest,
  GetUserWithSessionRequest,
  ListPublicUsersRequest,
} from "../types/user.types.js";

const getUserWithSession = catchAsync(async (req: GetUserWithSessionRequest, res: Response) => {
  return res.status(200).json({
    user: req.user,
    session: req.session,
  });
});

const getPublicUserById = catchAsync(async (req: GetUserRequest, res: Response) => {
  const user = await userService.getPublicUserById(req.params.id);
  return res.status(200).json({ user });
});

const listPublicUsers = catchAsync(async (req: ListPublicUsersRequest, res: Response) => {
  const users = await userService.listPublicUsers(req.query);
  return res.status(200).json({ users });
});

export default {
  getUserWithSession: getUserWithSession,
  getPublicUserById: getPublicUserById,
  listPublicUsers: listPublicUsers,
};
