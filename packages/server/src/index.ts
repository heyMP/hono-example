import { serve } from '@hono/node-server';
import { Hono } from "hono";
import { hc } from 'hono/client';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod';

let count = 1;
const countApp = new Hono()
  .get("/", (c) => c.json({ count }))
  .post(
    "/",
    zValidator(
      'json',
      z.object({
        count: z.number()
      })
    ),
    (c) => {
      const { count } = c.req.valid('json');
      return c.json({ count });
    }
  );

const app = new Hono()
  .use(cors())
  .route("/count", countApp);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;

const client = hc<typeof app>("http://localhost:3000");

