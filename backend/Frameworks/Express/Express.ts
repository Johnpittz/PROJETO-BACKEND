import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { middleware } from "./middlewares";

config();

export function configsExpress(): Application {
  const app = express();

  app.use(express.json());
  app.use(middleware);

  return app;
}