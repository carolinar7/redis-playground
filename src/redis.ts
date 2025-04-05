import { createClient, RedisClientType } from 'redis';

class RedisService {
  private client: RedisClientType;

  constructor(url: string = 'redis://localhost:6379') {
    this.client = createClient({
      url: url
    });

    // Setup error handling
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to Redis successfully');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      console.log('Disconnected from Redis');
    } catch (error) {
      console.error('Error disconnecting from Redis:', error);
      throw error;
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

export const redisService = new RedisService();
export default RedisService; 