import { setupServer } from "./server";

async function main() {
  const server = setupServer();

  process.on("SIGTERM", () => {
    console.log("Closing server");
    server.close();
  });

  console.log("Starting server");
  await server.listen(25564);
}

main()
  .then(() => {
    console.log("Server closed");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
