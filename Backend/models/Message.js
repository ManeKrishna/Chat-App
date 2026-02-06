const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: mongoose.Schema.Types.ObjectId,
    sender: mongoose.Schema.Types.ObjectId,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
