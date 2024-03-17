import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const todos = new Hono();

todos.get('/', (c) => {
  return c.json({ todos: [] });
});

todos.get('/:id',
  zValidator(
    'query',
    z.object({
      id: z.string().optional()
    })
  ),
  (c) => {
    const id = c.req.param('id');
    return c.json({ todos: { id } });
  }
);

export { todos };
