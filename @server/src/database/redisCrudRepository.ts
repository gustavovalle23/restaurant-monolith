import { RedisClientType as RedisClient } from 'redis';
import { promisify } from 'util';
import Redis from './redis'

export default class RedisCrudRepository<T> {
  private client: RedisClient;
  private prefix: string;

  constructor(schema: string) {
    this.client = Redis.getClient();
    this.prefix = `${schema}:`;
  }

  private generateKey(id: string) {
    return this.prefix + id;
  }

  async create(data: T, id: string): Promise<void> {
    const key = this.generateKey(id);
    const serializedData = JSON.stringify(data);
    await promisify(this.client.set).bind(this.client)(key, serializedData);
  }

  async read(id: string): Promise<T | null> {
    const key = this.generateKey(id);
    const serializedData = await promisify(this.client.get).bind(this.client)(key);
    if (serializedData) {
      return JSON.parse(serializedData) as T;
    }
    return null;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const existingData = await this.read(id);
    if (!existingData) {
      throw new Error(`Item with ID ${id} not found.`);
    }
    const updatedData = { ...existingData, ...data };
    const key = this.generateKey(id);
    const serializedData = JSON.stringify(updatedData);
    await promisify(this.client.set).bind(this.client)(key, serializedData);
  }

  async delete(id: string): Promise<void> {
    const key = this.generateKey(id);
    await promisify(this.client.del).bind(this.client)(key);
  }
}
