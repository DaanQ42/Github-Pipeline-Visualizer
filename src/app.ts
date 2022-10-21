import express from "express";

const routes = require("./routes/index");

export function newServer() {
  console.log("Setup new server");
  const app = express();

  app.use("/", routes);

  return app;
}
