import * as dotenv from 'dotenv';
dotenv.config();

const conf = {
  server: {
    port: process.env.SERVER_PORT || 3009,
    host: process.env.SERVER_HOST || 'localhost',
  },
  storage: {
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
  },
  rateLimits: {
    upload: process.env.RATE_LIMIT_UPLOAD || 5,
    download: process.env.RATE_LIMIT_DOWNLOAD || 10,
  },
}

export default conf;
