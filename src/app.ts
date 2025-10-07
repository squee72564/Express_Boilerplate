import express, { type Express } from "express";

import { successHandler, errorHandler } from "./config/morgan.js";

import env from "./config/index.ts";

import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import xssSanitize from "./middleware/xss-clean/index.js";

const app: Express = express();

if (env.NODE_ENV !== "test") {
  app.use(successHandler);
  app.use(errorHandler);
}

// https://helmetjs.github.io/
// Secruity HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xssSanitize());

// Protect against HTTP Parameter Pollution
app.use(hpp());

// https://github.com/expressjs/cors
// Enable cors
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

export default app;
