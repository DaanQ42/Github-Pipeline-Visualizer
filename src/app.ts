import express from "express";
import path from "path";

const routes = require("./routes/index");

export function newServer() {
  console.log("Setup new server");
  const app = express();

  app.use("/static", express.static(path.join(__dirname, "..", "static")));

  app.use(express.json());
  app.use(express.urlencoded());

  app.use("/", routes);

  return app;
}
