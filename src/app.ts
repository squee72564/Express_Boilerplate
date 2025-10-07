import express, { type Express, type NextFunction, type Response, type Request } from "express";
import { type HttpError } from "http-errors";
import logger from "./utils/logger.js";

import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import xssSanitize from "./middleware/xss-clean/index.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());

// https://helmetjs.github.io/
app.use(helmet());

app.use(xssSanitize());

app.use(hpp());

// https://github.com/expressjs/cors
app.use(cors());

// https://express-rate-limit.mintlify.app/overview
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // 100 req per window
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable legacy rate limit headers
    ipv6Subnet: 56,
  })
);

app.use((error: HttpError, _req: Request, _res: Response, next: NextFunction) => {
  logger.log({
    level: "warn",
    message: `${error.name} (${error.status}: ${error.message}`,
  });

  next(error);
});

export default app;
