import logger from "../config/logger.js";
import FileService from "../services/file.service.js";

const fileService = new FileService();

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      logger.error("No file uploaded");
      return res.status(400).send({
        error: "No file uploaded",
      });
    }

    const { file } = req;
    const response = await fileService.uploadFile(file);
    res.json(response);
  } catch (error) {
    logger.error("Failed to upload the file: ", error);
    res.status(500).json({
      error: "Failed to upload the file",
    });
  }
}

export const downloadFile = async (req, res) => {
  try {
    const { publicKey } = req.params;
    const fileStream = await fileService.downloadFile(publicKey);
    fileStream.pipe(res);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export const deleteFile = async (req, res) => {
  try {
    const { publicKey } = req.params;
    const fileStream = await fileService.downloadFile(publicKey);
    fileStream.pipe(res);
  } catch (error) {
    logger.error("Failed to delete the file: ", error.message);
    res.status(500).send({
      error: "Failed to delete the file",
    });
  }
}
