import { WebSocket } from "ws";
import http from "http";

export function setupWebsocketReceiver(server: http.Server) {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
    clientTracking: true,
  });

  server.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on("connection", (ws, req) => {});

  return websocketServer;
}
