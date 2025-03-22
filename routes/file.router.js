import express from "express";
import multer from "multer";

import conf from "../config/conf.js";
import { uploadFile, downloadFile, deleteFile } from "../controllers/file.controller.js";
import { uploadLimiter, downloadLimiter } from "../config/rate-limiter.js";

const router = express.Router();
const upload = multer({
  limits: { fileSize: conf.storage.maxFileSize },
});

router.post("/", upload.single("file"), uploadLimiter, uploadFile);
router.get("/:publicKey", downloadLimiter, downloadFile);
router.delete("/:privateKey", deleteFile);

export default router;
