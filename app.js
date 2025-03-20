import express from "express";

import conf from './config/conf.js';
import router from './routes/router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(conf.server.port, () => {
  console.log(`File sharing server is running on port ${conf.server.port}`);
});

app.on('error', (err) => {
  console.error('Failed to start the server:', err);
});

export default app;