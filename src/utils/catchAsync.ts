import { type Request, type Response, type NextFunction } from "express";

type AsyncHandler<T = void> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

const catchAsync =
  <T>(fn: AsyncHandler<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

export default catchAsync;
