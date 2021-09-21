import express from "express";
import socketio from "socket.io";
import http from "http";

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
  }
});

httpServer.listen(5000, () => console.log("server is running on localhost:5000"))

io.on('connection', (socket) => {
  console.log(`${socket.id} conectou`)

  socket.on('disconnect', () => {
    console.log(`${socket.id} desconectou`)
  })

  socket.on('join', (room) => {
    console.log(`${socket.id} entrou na sala ${room}`);

    socket.join(room);
    
    if (room === "MANAGER") {
      const roomManager = io.sockets.adapter.rooms.get(room)

      console.log("Pessoas logadas no manager: " + roomManager?.size)

    // LOGICA PARA INCREMENTAR QUANTIDADE DE USUARIOS LOGADOS NO MANAGER

    }
    else if (room === "LIVEAGENT"){
      const roomManager = io.sockets.adapter.rooms.get(room)

      console.log("Pessoas logadas no liveagent: " + roomManager?.size)
    // LOGICA PARA INCREMENTAR QUANTIDADE DE USUARIOS LOGADOS NO LIVEAGENT
    }

  });
})
