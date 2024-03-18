import { Hono } from "hono";
import { cors } from 'hono/cors';
import count from './count';

const api = new Hono()
  .use(cors())
  .route("/count", count);

export default api;
