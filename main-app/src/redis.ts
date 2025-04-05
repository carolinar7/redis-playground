import { type RedisClientType, createClient } from 'redis';

export class RedisService {
  private client: RedisClientType;

  constructor(url: string = 'redis://localhost:6379') {
    this.client = createClient({
      url: url
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  }

  async start(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Redis service started');
    } catch (error) {
      console.error('Failed to start Redis service:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      await this.client.quit();
      console.log('Redis service stopped');
    } catch (error) {
      console.error('Failed to stop Redis service:', error);
      throw error;
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

export const redisService = new RedisService(); 