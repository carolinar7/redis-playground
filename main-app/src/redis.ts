import { type RedisClientType, createClient } from 'redis';

export class RedisService {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor(url: string = 'redis://localhost:6379') {
    this.client = createClient({
      url: url
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    this.client.on('connect', () => {
      this.isConnected = true;
      console.log('Connected to Redis');
    });

    this.client.on('end', () => {
      this.isConnected = false;
      console.log('Disconnected from Redis');
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
      if (this.isConnected) {
        await this.client.quit();
        console.log('Redis service stopped');
      } else {
        console.log('Redis already disconnected');
      }
    } catch (error) {
      console.error('Failed to stop Redis service:', error);
      // Don't throw here, as we're shutting down anyway
    }
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

export const redisService = new RedisService(); 