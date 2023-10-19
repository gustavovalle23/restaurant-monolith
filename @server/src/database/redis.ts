import * as Redis from 'redis';
import { promisify } from 'util';

class RedisCrudRepository<T> {
  private client: Redis.RedisClient;
  private prefix: string;

  constructor(schema: string) {
    this.client = Redis.createClient();
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

  async close(): Promise<void> {
    await this.client.close()
  }
}

const userRepository = new RedisCrudRepository<User>('user');

interface User {
  id: string;
  name: string;
  email: string;
}

const userId = '123';
const newUser: User = { id: userId, name: 'John Doe', email: 'john@example.com' };

userRepository.create(newUser, userId).then(() => {
  return userRepository.read(userId);
}).then((user) => {
  if (user) {
    console.log('Read user:', user);
    user.name = 'Updated Name';
    return userRepository.update(userId, user);
  }
}).then(() => {
  return userRepository.read(userId);
}).then((updatedUser) => {
  console.log('Updated user:', updatedUser);
  return userRepository.delete(userId);
}).then(() => {
  return userRepository.read(userId);
}).then((deletedUser) => {
  console.log('Deleted user:', deletedUser);
}).finally(() => {
  userRepository.close();
});
