import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

let socket = null;

export const initSocket = (userId) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("join", userId);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initSocket,
  getSocket,
  disconnectSocket,
};