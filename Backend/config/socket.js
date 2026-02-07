const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: { 
      origin: "http://localhost:5173", // Vite default port
      methods: ["GET", "POST"]
    },
  });

  // Store connected users
  const users = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins with their ID
    socket.on("join", (userId) => {
      users.set(userId, socket.id);
      socket.userId = userId;
      console.log(`User ${userId} joined with socket ${socket.id}`);
    });

    // Send message to specific user
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const receiverSocketId = users.get(receiverId);
      
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          senderId,
          message,
        });
      }
    });

    // User is typing
    socket.on("typing", ({ receiverId }) => {
      const receiverSocketId = users.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", {
          userId: socket.userId
        });
      }
    });

    // User stopped typing
    socket.on("stopTyping", ({ receiverId }) => {
      const receiverSocketId = users.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userStoppedTyping", {
          userId: socket.userId
        });
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      if (socket.userId) {
        users.delete(socket.userId);
        console.log(`User ${socket.userId} disconnected`);
      }
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = initSocket;
module.exports.getIO = getIO;