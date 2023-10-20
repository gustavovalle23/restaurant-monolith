import { IDatabase, IMain } from 'pg-promise';
import pgPromise from 'pg-promise';
import db from './postgres'


export class PostgresRepository<T> {
  constructor(private tableName: string) { }

  async create(data: T): Promise<T | null> {
    try {
      const query = pgp.helpers.insert(data as object, null, this.tableName) + ' RETURNING *';
      const result = await db.one(query);
      return result;
    } catch (error) {
      console.error('Error creating record:', error);
      return null;
    }
  }


  async read(id: number): Promise<T | null> {
    try {
      const result = await db.oneOrNone(`SELECT * FROM ${this.tableName} WHERE id = $1`, id);
      return result;
    } catch (error) {
      console.error('Error reading record:', error);
      return null;
    }
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    try {
      const query = pgp.helpers.update(data, null, this.tableName) + ' WHERE id = $1 RETURNING *';
      const result = await db.oneOrNone(query, id);
      return result;
    } catch (error) {
      console.error('Error updating record:', error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await db.none(`DELETE FROM ${this.tableName} WHERE id = $1`, id);
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      return false;
    }
  }

  async findBy<K extends keyof T>(field: K, value: T[K]): Promise<T[]> {
    try {
      const result = await db.any(`SELECT * FROM ${this.tableName} WHERE ${String(field)} = $1`, value);
      return result;
    } catch (error) {
      console.error('Error finding records:', error);
      return [];
    }
  }
}