import { z, type ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

interface ValidationSchema {
  params?: ZodType;
  query?: ZodType;
  body?: ZodType;
}

const validate = (schema: ValidationSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validate params
      if (schema.params) {
        req.params = schema.params.parse(req.params) as typeof req.params;
      }

      // Validate query
      if (schema.query) {
        req.query = schema.query.parse(req.query) as typeof req.query;
      }

      // Validate body
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.issues
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      next(error);
    }
  };
};

export default validate;
