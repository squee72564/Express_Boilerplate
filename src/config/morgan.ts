import morgan from "morgan";
import type { Request, Response } from "express";
import env from "./index.js";
import logger from "./logger.js";

morgan.token("message", (_req: Request, res: Response) => res.locals.errorMessage || "");

const getIpFormat = () => (env.NODE_ENV === "production" ? ":remote-addr - " : "");

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
