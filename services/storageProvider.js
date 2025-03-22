class StorageProvider {
  constructor() {}

  async uploadFile(file) {
    throw new Error('Abstract method not implemented');
  }

  async downloadFile(publicKey) {
    throw new Error('Abstract method not implemented');
  }

  async deleteFile(privateKey) {
    throw new Error('Abstract method not implemented');
  }
}

export default StorageProvider;
