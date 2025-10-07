import { createLogger, format, transports } from "winston";
import env from "../config/index.js";

var logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.errors({stack: true}),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'express-template' },
  transports: [
    new transports.File({filename: 'express-template-error.log', level: 'error'}),
    new transports.File({filename: 'express-template-error-combined.log'}),
  ],
});

if (env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
  );
}

export default logger;
