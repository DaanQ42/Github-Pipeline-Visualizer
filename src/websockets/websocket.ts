import { WebSocket } from "ws";

/**
 * Setups the websocket between the server and listening clients.
 * @param ws The websocket to setup.
 */
export function handleWebsocket(ws: WebSocket): void {
  const handleErr = (err: any) => {
    if (err) {
      console.log("Error sending job", err);
      ws.close(1006, "Error sending job data");
    }
  };

  const ping = setInterval(() => {
    ws.ping(JSON.stringify({ time: Date.now() }), undefined, handleErr);
  }, 10 * 1000);

  let lastHeard = Date.now();

  ws.on("message", (message) => {
    console.log("Received message: %s", message);
  })
    .on("close", (code, reason) => {
      console.log("Websocket closed", code, reason.toString());
      clearInterval(ping);
    })
    .on("unexpected-response", (request, response) => {
      console.log("Unexpected response", request, response);
      ws.close(1006, "Unexpected response");
    })
    .on("ping", (data) => {
      ws.pong(data, undefined, handleErr);
    })
    .on("pong", (data) => {
      lastHeard = Date.now();
    })
    .on("error", handleErr);
}
