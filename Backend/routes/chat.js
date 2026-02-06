import express from "express";
import auth from "../middleware/auth.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { getIO } from "../config/socket.js";

const router = express.Router();

// create or get chat
router.post("/", auth, async (req, res) => {
  const { userId } = req.body;

  let chat = await Chat.findOne({
    participants: { $all: [req.user.id, userId] },
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [req.user.id, userId],
    });
  }

  res.json(chat);
});

// get messages
router.get("/:chatId", auth, async (req, res) => {
  const messages = await Message.find({
    chat: req.params.chatId,
  }).sort("createdAt");

  res.json(messages);
});

// send message
router.post("/message", auth, async (req, res) => {
  const { chatId, content } = req.body;

  const message = await Message.create({
    chat: chatId,
    sender: req.user.id,
    content,
  });

  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: message._id,
  });

  const io = getIO();
  io.to(chatId).emit("new-message", message);

  res.status(201).json(message);
});

export default router;
