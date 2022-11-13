import { newServer } from "./app";
import { setupWebsocketReceiver } from "./routes/websockets/server";

function main() {
  return new Promise<void>((resolve, reject) => {
    try {
      const app = newServer();
      console.info("Starting server");
      const server = app.listen(25564);
      setupWebsocketReceiver(server);

      process.on("SIGTERM", () => server.close());

      server.on("close", () => {
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

main()
  .then(() => {
    console.log("Server stopped");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
