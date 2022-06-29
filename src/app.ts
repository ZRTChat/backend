import { Socket } from "socket.io";
import express from "express";
const app = express();
import logger from "./utils/logger";

const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
}
);

io.on("connection", (socket: Socket) => {
  logger.info(`User connected: ${socket.id}`);
  socket.on("message", (message: string) => {
    logger.info(`User ${socket.id} sent message: ${message}`);
    io.emit("message", message);
  });
});

http.listen(4444, () => {
  logger.info("Listening on port 4444");
});
