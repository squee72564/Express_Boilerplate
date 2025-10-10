import type { Request, Response } from "express";
import catchAsync from "@/utils/catchAsync.ts";
import userService from "../services/user.service.js";
import httpStatus from "http-status";
import ApiError from "@/utils/ApiError.ts";
import type { UserFilter } from "../types/user.d.ts";

const getUserById = catchAsync(async (req: Request, res: Response) => {
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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = req.query as unknown as UserFilter;
  try {
    const users = await userService.getAllUsers(filter);
    res.status(200).json(users);
  } catch {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
  }
});

export default {
  getUserById,
  getAllUsers,
};
