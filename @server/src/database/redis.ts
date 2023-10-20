import { RedisClientType as RedisClient, createClient } from 'redis';
import { promisify } from 'util';

class Redis {
  private static instance: Redis;
  private client: RedisClient;

  private constructor() {
    this.client = createClient();
  }

  public static getInstance() {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }

  public getClient() {
    return this.client;
  }

  public async quit() {
    await promisify(this.client.quit).bind(this.client)();
  }
}

export default Redis.getInstance();
