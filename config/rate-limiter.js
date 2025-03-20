import rateLimit from "express-rate-limit";
import conf from "./conf.js";

export const uploadLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: conf.rateLimits.upload,
  statusCode: 429,
  message: {
    error: "Upload limit exceeded for the day",
  }
});

export const downloadLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: conf.rateLimits.download,
  statusCode: 429,
  message: {
    error: "Download limit exceeded for the day",
  }
});
