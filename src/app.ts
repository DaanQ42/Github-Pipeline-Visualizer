import express from "express";

export function newServer() {
  console.log("Setup new server");
  const app = express();

  app.get("/", function (req, res) {
    res.send("Hello World");
    console.log(req);
  });

  return app;
}
