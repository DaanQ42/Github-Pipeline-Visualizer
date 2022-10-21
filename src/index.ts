import { newServer } from "./app";

function main() {
  return new Promise<void>((resolve, reject) => {
    try {
      const app = newServer();
      const server = app.listen(25564);

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
