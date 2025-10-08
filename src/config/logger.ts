import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "express-template" },
  transports: [
    new transports.File({
      filename: "express-template-error.log",
      level: "error",
    }),
    new transports.File({ filename: "express-template-error-combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack, ...meta }) => {
          const { _service, ...rest } = meta;

          let stackStr = "";
          if (stack) {
            stackStr = `\n${stack}`;
            delete rest.stack;
          }

          const metaStr = Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : "";
          return `${timestamp} [${level}]: ${message}${metaStr}${stackStr}`;
        })
      ),
    })
  );
}

export default logger;
