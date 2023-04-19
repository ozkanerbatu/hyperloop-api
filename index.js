const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.emit("levitasyonBatarya",80)
  socket.on("_levitasyonSicakligi",(data)=>{
    socket.emit("levitasyonSicakligi",data)
  })
  socket.on("_ortamSıcaklığı",(data)=>{
    socket.emit("ortamSıcaklığı",data)
  })
  socket.on("_itkiSıcaklığı",(data)=>{
    socket.emit("itkiSıcaklığı",data)
  })
  socket.on("_levitasyonBatarya",(data)=>{
    socket.emit("levitasyonBatarya",data)
  })
  socket.on("_motorSürücüBatarya",(data)=>{
    socket.emit("motorSürücüBatarya",data)
  })
  socket.on("_electronicBatarya",(data)=>{
    socket.emit("electronicBatarya",data)
  })
  socket.on("_itkiBatarya",(data)=>{
    socket.emit("itkiBatarya",data)
  })
  
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
