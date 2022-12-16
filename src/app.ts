import express from "express";
import path from "path";

const routes = require("./routes/index");

export function newServer() {
  console.log("Setup new server");
  const app = express();

  const staticFiles = express.static(path.join(__dirname, "..", "static"), { index: "index.html" });
  app.use("/static", staticFiles);
  app.use("/page", staticFiles);

  app.use(express.json());
  app.use(express.urlencoded());

  app.use("/", routes);
  app.get("/", (req, res) => res.redirect("/page/index.html"));

  return app;
}
