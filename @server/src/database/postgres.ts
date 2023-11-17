// db.ts

import { Pool } from 'pg';

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: 'your_username',
      host: 'your_host',
      database: 'your_database',
      password: 'your_password',
      port: 5432,
    });
  }

  public static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool() {
    return this.pool;
  }
}

const db = Database.getInstance(); // Create and export the instance

export default db;
