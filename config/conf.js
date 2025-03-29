import * as dotenv from 'dotenv';
dotenv.config();

const conf = {
  server: {
    port: process.env.SERVER_PORT || 3009,
    host: process.env.SERVER_HOST || 'localhost',
  },
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'local',
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024, // 10 MB
    deleteThreshold: process.env.DELETE_THRESHOLD || 6, // default 6 months
  },
  rateLimits: {
    upload: process.env.RATE_LIMIT_UPLOAD || 5,
    download: process.env.RATE_LIMIT_DOWNLOAD || 10,
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    dir: process.env.LOG_DIR || 'logs',
  },
}

export default conf;
