const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("connected", socket.id);
  socket.on("lbs",(data)=>{
    socket.emit("levitasyonSıcaklığı",data)
  })
  socket.on("os",(data)=>{
    socket.emit("ortamSıcaklığı",data)
  })
  socket.on("ims",(data)=>{
    socket.emit("itkiSıcaklığı",data)
  })
  socket.on("b2",(data)=>{
    socket.emit("levitasyonBatarya",data)
  })
  socket.on("b1",(data)=>{
    socket.emit("_motorSürücüBatarya",data)
  })
  socket.on("b3",(data)=>{
    socket.emit("electronicBatarya",data)
  })
  socket.on("b4",(data)=>{
    socket.emit("ssss",data)
  })
  socket.on("ld",(data)=>{
    socket.emit("lidar",data)
  })
  socket.on("kr",(data)=>{
    socket.emit("renkSensoru",data)
  })
  socket.on("gx",(data)=>{
    socket.emit("gx",data)
  })
  socket.on("gy",(data)=>{
    socket.emit("gy",data)
  })
  socket.on("gz",(data)=>{
    socket.emit("gz",data)
  })
  socket.on("rpm",(data)=>{
    console.log("rpm",data);
    socket.emit("hiz","data")
  })
});
io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});