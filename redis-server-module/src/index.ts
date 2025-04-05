import { RedisServer } from 'redis-server';

export class RedisServerService {
  private server: RedisServer;
  private port: number;

  constructor(port: number = 6379) {
    this.port = port;
    this.server = new RedisServer({
      port: this.port,
      bin: 'redis-server'
    });
  }

  async start(): Promise<void> {
    try {
      await this.server.open();
      console.log(`Redis server started on port ${this.port}`);
    } catch (error) {
      console.error('Failed to start Redis server:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      await this.server.close();
      console.log('Redis server stopped');
    } catch (error) {
      console.error('Error stopping Redis server:', error);
      throw error;
    }
  }

  getPort(): number {
    return this.port;
  }
} 