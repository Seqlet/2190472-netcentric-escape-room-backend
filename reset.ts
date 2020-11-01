import { Socket } from "socket.io";
import gameArray from "./game";
import { Game, Event } from "./Interfaces";
import { random, randomPos } from "./random";

export function resetGame(game: Game, socket: Socket) {
  let regame: Game = {
    exitPosition: { x: random(5), y: random(5) },
    obstaclePositions: [],
    timer: 10,
    winner: null,
    currentPlayer: random(2),
    roomCode: game.roomCode,
    players: [],
  };
  for (let i = 0; i < 5; i++) {
    regame.obstaclePositions.push(randomPos(game));
  }
  const gameIndex = gameArray.findIndex((game) => game.roomCode);
  gameArray[gameIndex] = regame;
  socket.to(game.roomCode).emit(Event.PLAY_GAME, regame);
}
