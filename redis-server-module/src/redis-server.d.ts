declare module 'redis-server' {
  export class RedisServer {
    constructor(config: { port: number; bin: string });
    open(): Promise<void>;
    close(): Promise<void>;
  }
} 