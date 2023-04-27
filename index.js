const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let client_id = "";
let raspberry_id = "";
let sayı =1
io.on("connection", (socket) => {
  console.log("user connected",sayı, socket.id);
  sayı++
  socket.emit("connected", socket.id);
  socket.on("client_id", (data) => {
    client_id = data;
  });
  socket.on("raspberry_id", (data) => {
    raspberry_id = data;
  });
  socket.on("lbs", (data) => {
    console.log("lbs:", data);
    let levb = data;
    levb = parseInt(levb);
    io.to(client_id).emit("levitasyonSıcaklığı", levb);
    
  });
  socket.on("os", (data) => {
    console.log("ortam sıcaklığı:", data);
    io.to(client_id).emit("ortamSıcaklığı", data);
  });
  socket.on("ims", (data) => {
    console.log("ims:", data);
    io.to(client_id).emit("itkiSıcaklığı", data);
  });
  socket.on("b2", (data) => {
    console.log("b2:", data);
    io.to(client_id).emit("levitasyonBatarya", data);
  });
  socket.on("b1", (data) => {
    console.log("b1:", data);
    io.to(client_id).emit("motorSürücüBatarya", data);
  });
  socket.on("b3", (data) => {
    console.log("b3:", data);
    io.to(client_id).emit("electronicBatarya", data);
  });
  socket.on("b4", (data) => {
    console.log("b4:", data);
    io.to(client_id).emit("frenBatarya", data);
  });
  socket.on("ld", (data) => {
    console.log("lidar :", data);
    io.to(client_id).emit("lidar", data);
  });
  socket.on("kr", (data) => {
    console.log("geçilen şerit sayısı", data);
    io.to(client_id).emit("renkSensoru", data);
  });
  socket.on("gx", (data) => {
    console.log("gx:", data);
    io.to(client_id).emit("gx", data);
  });
  socket.on("gy", (data) => {
    console.log("gy:", data);
    io.to(client_id).emit("gy", data);
  });
  socket.on("gz", (data) => {
    console.log("gz:", data);
    io.to(client_id).emit("gz", data);
  });
  socket.on("rpm", (data) => {
    let data1=""
    let data2=""
    let time1=""
    let time2=""
    if(!data1){
      data1=data;
      time1=Date.now();
    }
    if(!data2&&data1){
      data2=data;
      time2=Date.now()
      const acceleration=speedToAcceleration(data1,time1,data2,time2);
      data1=data2;
      time1=time2;
      data2=""+8

      io.to(client_id).emit("ivme", acceleration);
    }
    io.to(client_id).emit("hiz", data);
  });
  

  socket.on("k", (data) => {
    console.log("konum: " ,data)
    const percentage = (data /175) *100;
    io.to(client_id).emit("konum", parseInt(percentage));
  });
  

  socket.on("başlat", () => {
    console.log("baslat");
    io.to(raspberry_id).emit("baslat", true);
  });
  socket.on("acil", () => {
    console.log("acil");
    io.to(raspberry_id).emit("fren", true);
  });

  socket.on("hazır", () => {
    console.log("hazır");
    console.log(raspberry_id);
    io.to(raspberry_id).emit("h", true);
  });
  socket.on("durdur", () => {
    console.log("durdur");
    io.to(raspberry_id).emit("fren", true);
  });
  socket.on("gerial", () => {
    console.log("gerial");
    io.to(raspberry_id).emit("gerial", true);
  });
});

io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});

const speedToAcceleration = (speed1,time1,speed2,time2) => {
  const acceleration = (speed2 - speed1) / (time2 - time1);
  return acceleration;
}