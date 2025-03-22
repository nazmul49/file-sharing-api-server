import StorageProvider from "./storageProvider.js";

class CloudStorageProvider extends StorageProvider {
  constructor() {}

  async uploadFile(file) {
    // Need to implement the uploadFile method
  }

  async downloadFile(publicKey) {
    // Need to implement the downloadFile method
  }

  async deleteFile(privateKey) {
    // Need to implement the deleteFile method
  }
}

export default CloudStorageProvider;
