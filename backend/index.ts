import express from "express";
import http from "http";
import "./config/db";
import webRoutes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import { startWebSocketServer } from "./websocket/app";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(webRoutes);
app.use(errorHandler);
const server = http.createServer(app);

const startServer = async () => {
  server.listen(4000, () => {
    console.log("server is listening on port 4000");
  });
  startWebSocketServer(server);
};

startServer();
