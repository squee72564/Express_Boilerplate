import { clean } from "./xss.ts";
import { type Request, type Response, type NextFunction } from "express";

export default function xssSanitize() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);

    next();
  };
}
