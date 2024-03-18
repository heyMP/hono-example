import { zValidator } from '@hono/zod-validator';
import { Hono } from "hono";
import { z } from 'zod';

let _count = 1;
export default new Hono()
  .get("/", (c) => c.json({ count: _count }))
  .post(
    "/",
    zValidator(
      'json',
      z.object({
        count: z.number()
      })
    ),
    (c) => {
      const { count: count } = c.req.valid('json');
      _count = count;
      return c.json({ count });
    }
  );
