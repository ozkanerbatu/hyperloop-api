const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let client_id=""
let raspberry_id = "";

io.on("connection", (socket) => {
  socket.emit("connected", socket.id);
  socket.on("client_id", (data) => {
    client_id=data
  });
  socket.on("raspberry_id", (data) => {
    raspberry_id=data
  });
  socket.on("lbs",(data)=>{
    io.to(client_id).emit("levitasyonSıcaklığı",data)
  })
  socket.on("os",(data)=>{
    io.to(client_id).emit("ortamSıcaklığı",data)
  })
  socket.on("ims",(data)=>{
    io.to(client_id).emit("itkiSıcaklığı",data)
  })
  socket.on("b2",(data)=>{
    io.to(client_id).emit("levitasyonBatarya",data)
  })
    socket.on("b1",(data)=>{
    io.to(client_id).emit("motorSürücüBatarya",data)
  })
    socket.on("b3",(data)=>{
    io.to(client_id).emit("electronicBatarya",data)
  })
    socket.on("b4",(data)=>{
    io.to(client_id).emit("frenBatarya",data)
  })
    socket.on("ld",(data)=>{
    io.to(client_id).emit("lidar",data)
  })
    socket.on("kr",(data)=>{
    io.to(client_id).emit("renkSensoru",data)
  })
    socket.on("gx",(data)=>{
    io.to(client_id).emit("gx",data)
  })
    socket.on("gy",(data)=>{
    io.to(client_id).emit("gy",data)
  })
    socket.on("gz",(data)=>{
    io.to(client_id).emit("gz",data)
  })
    socket.on("rpm",(data)=>{

    io.to(client_id).emit("hiz",data)
  })

    socket.on("başlat",()=>{

    io.to(raspberry_id).emit("başlat",true)
  })
    socket.on("acil",()=>{

    io.to(raspberry_id).emit("fren",true)
  })
   
    socket.on("hazır",()=>{

    io.to(raspberry_id).emit("hazır",true)
  })
    socket.on("durdur",()=>{

    io.to(raspberry_id).emit("fren",true)
  })
  socket.on("gerial",()=>{

    io.to(raspberry_id).emit("gerial",true)
  })
  
  
});

io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});