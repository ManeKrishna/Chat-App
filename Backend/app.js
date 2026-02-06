const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/chats", require("./routes/chat"));

app.get("/", (req, res) => {
    res.send("Backend is running");
  });
  

module.exports = app;
