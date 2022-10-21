import { setupServer } from "./server";

function main(resolve: (value?: any) => void, reject: (e: Error) => void) {
  const server = setupServer();

  process.on("SIGTERM", () => {
    console.log("Closing server");
    server.close();
  });

  console.log("Starting server");
  server.listen(25564);

  server.on("close", () => resolve());
}

function loop() {
  return new Promise((resolve, reject) => {
    try {
      main(resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
}

loop()
  .then(() => {
    console.log("Server closed");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
