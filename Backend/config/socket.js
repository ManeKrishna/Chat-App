const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(userId);
    });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      io.to(receiverId).emit("receiveMessage", {
        senderId,
        message,
      });
    });
  });
};

module.exports = initSocket;
