import express from "express";
import multer from "multer";

import { uploadFile, downloadFile, deleteFile } from "../controllers/file.controller.js";
import { uploadLimiter, downloadLimiter } from "../config/rate-limiter.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), uploadLimiter, uploadFile);
router.get("/:privateKey", downloadLimiter, downloadFile);
router.delete("/:publicKey", deleteFile);

export default router;
