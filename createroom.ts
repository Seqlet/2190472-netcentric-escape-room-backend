import random, { randomID } from "./random";
import { nanoid } from "nanoid";
import { Player, HatType, PlayerType, Game } from "./Interfaces/index";
io.on("connect, onConnect");
function onConnect(socket) {
  console.log("a client connected");
  //create player object
  socket.on("given name", oncreateGame => {
    console.log("message: " + oncreateGame);
    let player1: Player = {
      id: randomID(),
      name: oncreateGame,
      hatType: HatType.OLD,
      playerType: random(2),
      position: { x: random(5), y: random(5) },
      victory: 0
    };
    let game: Game = {
      exitPosition: { x: random(5), y: random(5) },
      obstaclePositions: [
        { x: random(5), y: random(5) },
        { x: random(5), y: random(5) },
        { x: random(5), y: random(5) },
        { x: random(5), y: random(5) },
        { x: random(5), y: random(5) },
      ],
      timer: 10,
      winner: null,
      currentPlayer: random(2),
      roomCode: randomID(),
      players: [player1],
    };
  });
}
