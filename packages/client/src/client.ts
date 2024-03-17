import { hc } from 'hono/client';
import app from '@heymp/hono-example-server/src/index.js';

export const client = hc<typeof app>('http://localhost:3000');
