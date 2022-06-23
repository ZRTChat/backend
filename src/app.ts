import { Socket } from "socket.io";
import logger from "./utils/logger";

const http = require('http').createServer();

const io = require('socket.io')(http, {
  cors: {origin: "*"}
});

io.on("connection", (socket: Socket) => {
  logger.info(`User connected: ${socket.id}`);
  socket.on("message", (message: string) => {
    logger.info(`User ${socket.id} sent message: ${message}`);
    io.emit("message", message);
  }
  );

}
);

http.listen(4000, () => {
  logger.info("Listening on port 4000");
}
);
