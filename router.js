import express from "express";
import fileRouter from "./modules/files/routes/file.router.js";

const router = express.Router();

router.use("/files", fileRouter);

export default router;
