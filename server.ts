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
import gameArray, { timers } from "./game";
import playGame from "./playgame";
import { myTimer } from "./timer";
import { findGame } from "./findgame";
import { resetGame } from "./reset";
import { changeCostume } from "./changecostume";
import { playAgain } from "./playAgain";
const io = socketio(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.end("Server Running");
});

io.on("connection", function (socket: Socket) {
  console.log("user connected");
  socket.on(Event.FIND_LOBBY, function (roomCode: string) {
    prejoinRoom(roomCode, socket);
  });
  socket.on(Event.JOIN_ROOM, function (data: JoinRoom) {
    joinRoom(data, socket, io);
  });
  socket.on(Event.CREATE_GAME, function (playerName: string) {
    createGame(playerName, socket, io);
  });
  socket.on(Event.CHANGE_COSTUME, function (player: Player) {
    changeCostume(player, io);
  });
  socket.on(Event.PLAY_GAME, function (player: Player) {
    const gameIndex = gameArray.findIndex((game) =>
      game.players.find((gamePlayer) => gamePlayer.id === player.id)
    );
    if (timers[gameIndex] === null) {
      timers[gameIndex] = setInterval(
        () => myTimer(gameArray[gameIndex], io),
        1000
      );
    }
    playGame(player, io);
  });
  socket.on(Event.RESET_GAME, function (game: Game) {
    resetGame(game, io);
  });
  socket.on(Event.PLAY_AGAIN, function (game: Game) {
    playAgain(game, io);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.broadcast.emit("A user disconnected");
  });
});
