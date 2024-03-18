import { hc } from 'hono/client';
import api from '@heymp/hono-example-server/src/routes/api/index.js';

export const client = hc<typeof api>('http://localhost:3000/api');
