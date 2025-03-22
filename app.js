import express from "express";

import conf from './config/conf.js';
import router from './routes/router.js';
import sequelize from "./config/database.js";
import logger from "./config/logger.js";

const app = express();

// Middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Establish database connection and start server
(async () => {
  try {
    await sequelize.authenticate(); // Test the database connection
    logger.info("Database connection established successfully.");

    // Auto-sync models with the database
    await sequelize.sync({ alter: true }); // Use `alter: true` to update the schema without dropping tables
    logger.info("Database synchronized.");

    app.listen(conf.server.port, () => {
      logger.info(`File sharing server is running on port ${conf.server.port}`);
    });

    app.on('error', (err) => {
      logger.error('Failed to start the server:', err);
    });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
})();

export default app;
