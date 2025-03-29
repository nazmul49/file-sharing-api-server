import { CronJob } from 'cron';
import deleteInactiveFiles from './tasks/deleteActiveFiles.js';

const job1 = new CronJob('*/5 * * * *', deleteInactiveFiles);

const start_bg_jobs = () => {
  console.log('Starting background job');
  job1.start();
};

export default start_bg_jobs;
