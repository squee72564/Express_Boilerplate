import type { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../utils/catchAsync.js";
import userService from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import type { UserFilter } from "../types/user.types.js";

const getUserById: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id as string);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.status(200).json(user);
  } catch {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
  }
});

const getAllUsers: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const filter = req.query as unknown as UserFilter;
  try {
    const users = await userService.getAllUsers(filter);
    res.status(200).json(users);
  } catch {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
  }
});

export default {
  getUserById: getUserById as RequestHandler,
  getAllUsers: getAllUsers as RequestHandler,
};
