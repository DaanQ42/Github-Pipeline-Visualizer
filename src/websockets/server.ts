import { WebSocketServer } from "ws";
import { WorkflowJob } from "../lib/uniform/WorkflowJob";
import { handleWebsocket } from "./websocket";
import http from "http";

var websocketServer: WebSocketServer;

export function setupWebsocketReceiver(server: http.Server) {
  websocketServer = new WebSocketServer({
    noServer: true,
    path: "/websockets",
    clientTracking: true,
  });

  server.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on("connection", (ws, req) => {
    try {
      handleWebsocket(ws);
    } catch (err) {
      console.log("Error handling websocket", err);

      if (ws.readyState !== WebSocket.CLOSED) {
        ws.close(1006, "Error on server side");
      }
    }
  });

  return websocketServer;
}

export function SendWorkflow(workflow: WorkflowJob) {
  const msg = {
    type: "workflow",
    data: workflow,
  };

  console.log(`Sending ${msg.type} to ${websocketServer.clients?.size}`);

  websocketServer.clients?.forEach((client) => {
    client.send(msg, (err) => {
      client.close(1000, "Closing connection");
    });
  });
}
