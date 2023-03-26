const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Коннектим юзера ID: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(` Юзер ID: ${socket.id} зашел в чат: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`Юзер отключился ID: ${socket.id}`)
  });
});

server.listen(3001, () => {
  console.log("сервер готов чатиться");
});
