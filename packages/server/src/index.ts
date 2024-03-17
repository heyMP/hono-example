import { serve } from '@hono/node-server';
import { Hono } from "hono";
import { cors } from 'hono/cors';
import count from './routes/count';

const app = new Hono()
  .use(cors())
  .route("/count", count);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;
