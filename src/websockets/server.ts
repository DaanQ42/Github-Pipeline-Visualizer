import { WebSocketServer } from "ws";
import { WorkflowJob } from "../lib/uniform/WorkflowJob";
import http from "http";

var websocketServer: WebSocketServer;

export function setupWebsocketReceiver(server: http.Server) {
  websocketServer = new WebSocketServer({
    noServer: true,
    path: "/websockets",
    clientTracking: true,
  });

  server.on("upgrade", (request, socket, head) => {
    console.log("Upgrading to websocket", request.url);

    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on("connection", (ws, req) => {
    console.log("someone connected!");
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
