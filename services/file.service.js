import conf from "../config/conf.js";
import File from "../models/file.js";
import LocalFileSystemProvider from "./localFileSystemProvider.js";
import CloudStorageProvider from "./cloudStorageProvider.js";
import logger from '../config/logger.js';

class FileService {
  constructor() {
    this.provider = conf.storage.provider === 'local' ? new LocalFileSystemProvider(conf.storage.uploadDir) : new CloudStorageProvider();
  }

  /**
   * Uploads a file using the configured storage provider and saves its metadata.
   *
   * @param {Object} file - The file object to be uploaded.
   *
   * @returns {Promise<Object>} - A promise that resolves to the metadata of the uploaded file.
   * @throws {Error} - Throws an error if the upload fails or the response is invalid.
   */
  async uploadFile(file) {
    try {
      const response = await this.provider.uploadFile(file);
      if (!response) {
        logger.error('Failed to upload file');
        throw new Error('Failed to upload file');
      }

      const metadata = {
        originalName: file.originalname,
        filePath: response.filePath,
        publicKey: response.publicKey,
        privateKey: response.privateKey,
        provider: response.provider,
      };

      await File.create(metadata);

      return {
        publicKey: metadata.publicKey,
        privateKey: metadata.privateKey
      }
    } catch (error) {
      logger.error('Failed to upload file: ', error);
      throw new Error(error.message ? error : 'Failed to upload file');
    }
  }

  async downloadFile(publicKey) {
    const fileRecord = await File.findOne({ where: { publicKey } });
    if (!fileRecord) {
      logger.error('File metadata not found');
      throw new Error('File metadata not found');
    }

    return await this.provider.downloadFile(fileRecord.filePath);
  }

  async deleteFile(privateKey) {
    const fileRecord = await File.findOne({ where: { privateKey } });
    if (!fileRecord) {
      throw new Error('File not found.');
    }

    const removeFileResponse = await this.provider.deleteFile(fileRecord.filePath);
    if (removeFileResponse) {
      fileRecord.destroy();
    }

    return { message: "File deleted successfully" };
  }
}

export default FileService;
