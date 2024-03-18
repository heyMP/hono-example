import { serve } from '@hono/node-server';
import { Hono } from "hono";
import api from './routes/api';
import counter from './routes/counter';

const app = new Hono();
app.route("/counter", counter);
app.route("/api", api);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;
