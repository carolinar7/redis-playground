import express from 'express';
import { redisService } from './redis';
import { RedisService} from './redis';

const app = express();
const PORT = 3000;
const redisServer = new RedisService();

async function startServer() {
  return new Promise((resolve) => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      resolve(true);
    });
  });
}

async function main() {
  try {
    // Start Redis service
    await redisService.start();
    
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
      await redisService.stop();
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

main(); 