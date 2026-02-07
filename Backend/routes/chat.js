const express = require("express");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

const router = express.Router();

// Create or get existing chat
router.post("/", auth, async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if chat already exists
    let chat = await Chat.findOne({
      members: { $all: [req.user.id, userId] }
    });

    if (!chat) {
      chat = await Chat.create({
        members: [req.user.id, userId],
      });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all chats for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      members: req.user.id
    }).populate("members", "name email profilePic");
    
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a specific chat
router.get("/:chatId/messages", auth, async (req, res) => {
  try {
    const messages = await Message.find({ 
      chatId: req.params.chatId 
    }).populate("sender", "name profilePic").sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send a message
router.post("/:chatId/messages", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const { chatId } = req.params;

    const message = await Message.create({
      chatId,
      sender: req.user.id,
      text,
    });

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name profilePic");

    res.json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;