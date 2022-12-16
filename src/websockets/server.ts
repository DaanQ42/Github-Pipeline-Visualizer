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
      console.info("Websocket connection established", req.headers.origin);
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
  if (websocketServer.clients?.size === 0) {
    console.log("No one is listening for workflow updates 😞");
  }

  const msg = {
    type: "workflow",
    data: workflow,
  };

  console.log(`Sending ${msg.type} to ${websocketServer.clients?.size}`);
  const str = JSON.stringify(msg);

  websocketServer.clients?.forEach((client) => {
    const buffer = Buffer.from(str);
    client.send(buffer, (err) => {
      if (err) {
        console.log("Error sending job", err);
        client.close(1006, "Error sending job data");
      }
    });
  });
}
