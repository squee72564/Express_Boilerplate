import type { NextFunction, Request, RequestHandler, Response } from "express";
import "../types/express.types.js"; // Augment Express types and explicitly import so tsup includes it

import { fromNodeHeaders } from "better-auth/node";
import httpStatus from "http-status";

import auth from "../lib/auth.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

interface PermissionCheck {
  [resource: string]: string[];
}

const authMiddleware: (allowedRoles?: string[], permissions?: PermissionCheck) => RequestHandler = (
  allowedRoles,
  permissions
) =>
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

    const isAdmin = user.role === "admin";
    const isSuperAdmin = user.role === "superAdmin";

    if (isSuperAdmin) {
      return next();
    }

    if (allowedRoles && !allowedRoles.includes("superAdmin") && isAdmin) {
      return next();
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const roles = user.role ? user.role.split(",") : [];
      const hasAllowedRole = roles.some((r) => allowedRoles.includes(r.trim()));
      if (!hasAllowedRole) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden: insufficient role");
      }
    }

    if (permissions) {
      const permResult = await auth.api.userHasPermission({
        body: {
          userId: user.id,
          permissions: permissions,
        },
      });

      if (!permResult.success) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden: insufficient permission");
      }
    }

    next();
  });

export default authMiddleware;
