import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import httpStatus from "http-status";

import auth from "../lib/auth.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

const authMiddleware = (_role?: string) =>
  catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    const headers = fromNodeHeaders(req.headers);
    const result = await auth.api.getSession({
      headers: headers,
    });

    if (!result) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    const { session, user } = result;
    req.session = session;
    req.user = user;

    next();
  });

export default authMiddleware;
