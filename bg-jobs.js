import { CronJob } from 'cron';
import deleteInactiveFiles from './tasks/deleteActiveFiles.js';

// Run the job once a day at midnight (00:00)
const job1 = new CronJob('0 0 * * *', deleteInactiveFiles);

const start_bg_jobs = () => {
  console.log('Starting background job');
  job1.start();
};

export default start_bg_jobs;
