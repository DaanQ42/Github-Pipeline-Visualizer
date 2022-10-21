import { setupServer } from "./server";

async function main() {
  const server = setupServer();

  await server.listen();
}

main()
  .then(() => {
    console.log("Done");
  })
  .catch((err) => {
    console.error(err);
  });
