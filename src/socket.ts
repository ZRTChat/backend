import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import { nanoid } from "nanoid";

const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_CHANNEL: "CREATE_CHANNEL",
    },
    SERVER: {
        CHANNELS: "CHANNELS",
    }
}

const channels : Record<string, { name:string}> = {};

function socket({io}: { io:Server}) {
    logger.info("Socket.io connected");
    
    io.on("connection", (socket:Socket) => {
        logger.info(`User connected: ${socket.id}`);

        socket.on(EVENTS.CLIENT.CREATE_CHANNEL, ({ channelName }) => {
            logger.info(`User ${socket.id} created channel ${channelName}`);
            const channelID = nanoid()

            channels[channelID] = {
                name: channelName
            }

            socket.join(channelID);
            socket.broadcast.emit(EVENTS.SERVER.CHANNELS, channels);
        });

    });
}

export default socket;