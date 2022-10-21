import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
  console.log(req);
});

app.listen(3000);
