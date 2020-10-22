import { Event, JoinRoom } from "./Interfaces/index";
import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
import socketio from "socket.io";
import prejoinRoom from "./prejoinroom";
import joinRoom from "./joinroom";
const io = socketio(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.end("TGR");
});

io.on("connection", function (socket) {
  console.log("user connected");
  socket.on(Event.PREJOIN_ROOM, function (roomCode: string) {
    prejoinRoom(roomCode, io);
  });
  socket.on(Event.JOIN_ROOM, function (data: JoinRoom) {
    joinRoom(data, io);
  });
});
