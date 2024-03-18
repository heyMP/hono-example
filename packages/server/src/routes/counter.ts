import { Hono } from "hono";

const counter = new Hono()
  .get("/", (c) => c.text('hello, world!'));

export default counter;
