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
    sendData("levitasyonBatarya",data)
  })
  socket.on("os",(data)=>{
   console.log("ortam sıcaklığı",data);
    socket.emit("ortamSıcaklığı",data)
  })
  socket.on("ims",(data)=>{
   console.log("itki sıcaklığı",data);
    socket.emit("itkiSıcaklığı",data)
  })
  socket.on("b2",(data)=>{
   console.log("levitasyon batarya",data);
    socket.emit("levitasyonBatarya",data)
  })
  socket.on("_motorSürücüBatarya",(data)=>{
    socket.emit("_motorSürücüBatarya",data)
  })
  socket.on("b3",(data)=>{
    socket.emit("elektronikBatarya",data)
    socket.emit("electronicBatarya",data)
  })
  socket.on("b4",(data)=>{
    console.log("itki batarya",data);
    socket.emit("ssss",data)
  })
  socket.on("ld",(data)=>{
   // console.log("lidar",data);
    socket.emit("lidar",data)
  })
  socket.on("kr",(data)=>{
  //  socket.emit("renkSensoru",data)
    socket.emit("renkSensoru",data)
  })
  socket.on("gx",(data)=>{
   // console.log(data,"gx");
    socket.emit("gx",data)
  })
  socket.on("gy",(data)=>{
  //  console.log(data,"gy");
    socket.emit("gy",data)
  })
  socket.on("gz",(data)=>{
   // console.log(data,"gz");
    socket.emit("gz",data)
  })
  socket.on("rpm",(data)=>{
    console.log(data,"rpm");
    socket.emit("hız",data)
  })
});

io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});

const sendData = (key,data) => {
  try {
    io.to(socket.id).emit(key,data)
  }
  catch (e) {
    console.log(e);
  }
};
