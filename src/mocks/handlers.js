import { rest } from "msw";
import localhost from "../localhost";

export const handlers = [
  rest.get(`${localhost}/api/v1/characters/10001`, (req, res, ctx) => {
    return res(ctx.json({ characters: {} }));
  }),
  rest.get(`${localhost}/api/v1/skillsets`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(`${localhost}/api/v1/skills`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(`${localhost}/api/v1/data`, (req, res, ctx) => {
    return res(ctx.json({}));
  })
];
