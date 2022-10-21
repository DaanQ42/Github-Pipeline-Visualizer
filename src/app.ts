import express from "express";

const routes = require("./routes/index");

export function newServer() {
  console.log("Setup new server");
  const app = express();

  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded());

  app.use("/", routes);

  return app;
}
