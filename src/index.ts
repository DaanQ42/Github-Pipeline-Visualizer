import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
  console.log(req);
});

const server = app.listen(25564);

server.on("close", () => {
  console.log("Server closed");
  process.exit(0);
});

process.on("SIGKILL", () => shutdown("SIGTERM"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

function shutdown(event: string) {
  console.log("SIGTERM");
  server.close();
}
