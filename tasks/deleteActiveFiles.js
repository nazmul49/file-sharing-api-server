import logger from "../config/logger.js";
import conf from "../config/conf.js";
import FileService from "../modules/files/services/file.service.js";

const fileService = new FileService();

const deleteInactiveFiles = async () => {
  logger.info('Starting deletion of inactive files older than six months', new Error());
  await fileService.deleteInactiveFiles(conf.storage.deleteThreshold);
}

export default deleteInactiveFiles;
