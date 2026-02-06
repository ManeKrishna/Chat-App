const express = require("express");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const chat = await Chat.create({
    members: [req.user.id, req.body.userId],
  });
  res.json(chat);
});

router.get("/:chatId", auth, async (req, res) => {
  const messages = await Message.find({ chatId: req.params.chatId });
  res.json(messages);
});

module.exports = router;
