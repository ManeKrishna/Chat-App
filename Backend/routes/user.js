const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } });
  res.json(users);
});

module.exports = router;
