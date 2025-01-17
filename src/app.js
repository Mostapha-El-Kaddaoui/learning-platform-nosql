const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    await db.connectMongo();
    console.log('MongoDB connected');

    app.use(express.json());

    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', async () => {
  try {
    await db.closeConnections();
    console.log('Server shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

startServer();