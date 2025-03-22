import { createLogger, format, transports } from "winston";
import conf from "./conf.js";

const logger = createLogger({
  level: conf.logger.level,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: `${conf.logger.dir}/file-sharing-api-server.log` }) // Log to a file
  ],
});

export default logger;
