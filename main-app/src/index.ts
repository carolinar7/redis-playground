import express from 'express';
import { redisService } from './redis';

const app = express();
const PORT = 3000;

async function startServer() {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      resolve(true);
    });
  });
}

async function cleanup() {
  console.log('\nShutting down...');
  await redisService.stop();
  process.exit(0);
}

async function main() {
  try {
    await redisService.start();
    app.use(express.json());

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

    await startServer();

    // Handle both SIGTERM (from Docker/deployment) and SIGINT (Ctrl+C)
    process.on('SIGTERM', cleanup);
    process.on('SIGINT', cleanup);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main(); 