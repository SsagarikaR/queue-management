import { WebSocketServer } from "ws";

export const startWebSocketServer = async (server: any) => {
  const ws = new WebSocketServer({ server, path: "/api/ws" });

  ws.on("connection", (client) => {
    console.log("New WebSocket connection established.");

    client.on("message", (msg) => {
      const parsedMessage = JSON.parse(msg.toString());
      console.log(parsedMessage, "incoming message");
      if (parsedMessage.type === "updated-queue") {
        ws.clients.forEach((connectedClient) => {
          if (connectedClient.readyState === WebSocket.OPEN) {
            connectedClient.send(JSON.stringify({ type: "updated-queue" }));
          }
        });
      }
    });

    client.on("close", () => {
      console.log("Client disconnected.");
    });

    client.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });
};
