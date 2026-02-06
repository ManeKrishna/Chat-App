require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const initSocket = require("./config/socket");

connectDB();

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
