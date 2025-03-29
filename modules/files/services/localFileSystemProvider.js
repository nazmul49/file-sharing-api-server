import { existsSync, mkdirSync, promises, createReadStream, constants } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import StorageProvider from './storageProvider.js';
import logger from '../../../config/logger.js';

class LocalFileSystemProvider extends StorageProvider {
  constructor(rootFolder) {
    super(); // Call the parent class constructor
    this.rootFolder = rootFolder;
    if (!existsSync(this.rootFolder)) {
      mkdirSync(rootFolder);
    }
  }

  async uploadFile(file) {
    const publicKey = uuidv4();
    const privateKey = uuidv4();
    const publicFileName = `${publicKey}_${file.originalname}`;
    const filePath = join(this.rootFolder, publicFileName);

    // Write file to the specified path
    await promises.writeFile(filePath, file.buffer);

    return {
      publicKey,
      privateKey,
      filePath,
      provider: 'local'
    };
  }

  async downloadFile(filePath) {
    if (
      promises.access(filePath, constants.R_OK)
      .then(() => true)
      .catch(() => false)
    ) {
      return createReadStream(filePath);
    }

    logger.error('File not found');
    throw new Error('File not found');
  }

  async deleteFile(filePath) {
    // Check if the file exists, and if so, unlink it
    if (
      await promises
        .access(filePath, constants.F_OK)
        .then(() => true)
        .catch(() => false)
    ) {
      await promises.unlink(filePath);
      return { message: 'File removed successfully' };
    }
    throw new Error('File not found');
  }
}

export default LocalFileSystemProvider;