import express from "express";
import http from "http";
import "./config/db";
import webRoutes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { startWebSocketServer } from "./websocket/app";

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use(webRoutes);
const server = http.createServer(app);

const startServer = async () => {
  server.listen(4000, () => {
    console.log("server is listening on port 4000");
  });
  startWebSocketServer(server);
};

startServer();
