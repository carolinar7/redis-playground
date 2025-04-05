import express from 'express';
import { createClient } from 'redis';

const app = express();
const PORT = 3000;

// Redis client setup
const redisClient = createClient({
  url: 'redis://localhost:6379'
});

// Redis error handling
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

async function initRedis() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // Re-throw to handle in main
    throw error;
  }
}

async function startServer() {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      resolve(true);
    });
  });
}

// Main function to handle startup
async function main() {
  try {
    // Initialize Redis
    await initRedis();
    
    // Setup middleware
    app.use(express.json());

    // Setup routes
    app.get('/health', (_req, res) => {
      res.json({ status: 'ok' });
    });

    app.post('/api/data', (req, res) => {
      try {
        const data = req.body;
        res.json({
          message: 'Data received successfully',
          data
        });
      } catch (error) {
        res.status(500).json({
          error: 'Internal server error'
        });
      }
    });

    // Start server
    await startServer();

    // Setup graceful shutdown
    process.on('SIGTERM', async () => {
      await redisClient.quit();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Run the application
main();
