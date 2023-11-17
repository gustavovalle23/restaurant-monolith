import Koa from 'koa';
import Router from 'koa-router';
import db from './database/postgres'
import RedisCrudRepository from './database/redisCrudRepository';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  try {
    const client = await db.getPool().connect();

    RedisCrudRepository
  } catch (error) {

  }
})
