const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("my_message", "Hello from server");
  socket.emit("batter1",{id:1,value:0.5})
  socket.emit("velocity",{id:1,value:{
    x:0.5,
    y:0.5,
    z:0.5
  }})
});

io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
