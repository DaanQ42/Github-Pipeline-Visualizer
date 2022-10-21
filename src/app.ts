import express from "express";
import path from "path";

const routes = require("./routes/index");

export function newServer() {
  console.log("Setup new server");
  const app = express();

  app.use("/public", express.static(path.join(__dirname, "public")));

  app.use(express.json());
  app.use(express.urlencoded());

  app.use("/", routes);

  return app;
}
