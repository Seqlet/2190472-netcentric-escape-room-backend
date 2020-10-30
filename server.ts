import { Event, Game, JoinRoom, Player } from "./Interfaces/index";
import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
import socketio, { Socket } from "socket.io";
import prejoinRoom from "./prejoinroom";
import joinRoom from "./joinroom";
import createGame from "./createroom";
import gameArray from "./game";
import playGame from "./playgame";
import { myTimer } from "./timer";
import { findGame } from "./findgame";
import { resetGame } from "./reset";
import { changeCostume } from "./changecostume";
const io = socketio(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.end("TGR");
});

io.on("connection", function (socket: Socket) {
  console.log("user connected");
  socket.on(Event.PREJOIN_ROOM, function (roomCode: string) {
    prejoinRoom(roomCode, socket);
  });
  socket.on(Event.JOIN_ROOM, function (data: JoinRoom) {
    joinRoom(data, socket);
  });
  socket.on(Event.CREATE_GAME, function (playerName: string) {
    createGame(playerName, socket);
  });
  socket.on(Event.CHANGE_COSTUME, function(player : Player){
    changeCostume(player,socket);
  });
  socket.on(Event.PLAY_GAME, function (player: Player, update?: boolean) {
    const game = findGame(gameArray, player);
    let id = game?.intervalSet;
    if (!update && game?.intervalSet === null) {
      id = setInterval(() => myTimer(game, io), 1000);
    }
    playGame(player, socket);
  });
  socket.on(Event.RESET_GAME, function(game: Game){
    resetGame(game, socket);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.broadcast.emit('A user disconnected');
  });
});


