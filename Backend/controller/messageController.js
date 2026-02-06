import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  const message = await Message.create({
    sender: req.user.id,
    receiver: receiverId,
    content,
  });

  res.status(201).json(message);
};

export const getMessages = async (req, res) => {
  const { userId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: userId },
      { sender: userId, receiver: req.user.id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};
