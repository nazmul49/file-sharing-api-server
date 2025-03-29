import request from 'supertest';
import { expect } from 'chai';

import app from '../app.js';
import File from '../modules/files/models/file.js';

describe('File Routes Integration Tests', () => {
  let publicKey, privateKey;

  // Runs after all tests in this suite
  after(async () => {
    // Clean up the database after tests
    await File.destroy({ where: {}, truncate: true });
  });

  describe('POST /files', () => {
    it('should upload a file and return metadata', async () => {
      const response = await request(app)
        .post('/files')
        .attach('file', Buffer.from('Test file content'), 'test.txt'); // Simulate file upload

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('publicKey');
      expect(response.body).to.have.property('privateKey');

      // Save keys for later tests
      publicKey = response.body.publicKey;
      privateKey = response.body.privateKey;

      // Verify the file is saved in the database
      const fileRecord = await File.findOne({ where: { publicKey } });
      expect(fileRecord).to.not.be.null;
      expect(fileRecord.originalName).to.equal('test.txt');
    });
  });

  describe('GET /files/:publicKey', () => {
    it('should download a file by publicKey', async () => {
      const response = await request(app)
        .get(`/files/${publicKey}`);

      expect(response.status).to.equal(200);
      // expect(response.header['content-type']).to.equal('application/octet-stream');
      expect(response.text).to.equal('Test file content'); // Verify file content
    });
  });

  describe('DELETE /files/:privateKey', () => {
    it('should delete a file by privateKey', async () => {
      const response = await request(app)
        .delete(`/files/${privateKey}`);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('File deleted successfully');

      // Verify the file is removed from the database
      const fileRecord = await File.findOne({ where: { privateKey } });
      expect(fileRecord).to.be.null;
    });
  });
});
