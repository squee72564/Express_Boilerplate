import express, { type Router, type Request, type Response, type NextFunction } from "express";
import healthRoute from "./health.route.js";
import authRoute from "./auth.route.js";

interface RouteData {
  path: string;
  route: (_req: Request, res: Response, _next: NextFunction) => void;
}

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/health",
    route: healthRoute,
  },
] as RouteData[];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default {
  default: router,
  authRoute: authRoute,
};
