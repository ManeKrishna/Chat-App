import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } })
    .select("-password");

  res.json(users);
});

export default router;
