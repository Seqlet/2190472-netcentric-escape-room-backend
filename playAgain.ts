import { Server } from "socket.io";
import gameArray, { timers } from "./game";
import { Game, Event } from "./Interfaces";
import { random, randomPos } from "./random";
import { myTimer } from "./timer";

export function playAgain(game: Game, io: Server) {
  let regame: Game = {
    exitPosition: { x: random(5), y: random(5) },
    obstaclePositions: [],
    timer: game.maxTimer,
    maxTimer: game.maxTimer,
    winner: null,
    currentPlayer: random(2),
    roomCode: game.roomCode,
    players: [],
  };
  for (let i = 0; i < 5; i++) {
    regame.obstaclePositions.push(randomPos(regame));
  }

  regame.players = game.players;
  regame.players[0].position = randomPos(regame);
  regame.players[0].playerType = 1 - regame.players[0].playerType;
  regame.players[1].position = randomPos(regame);
  regame.players[1].playerType = 1 - regame.players[1].playerType;

  const gameIndex = gameArray.findIndex((game) => game.roomCode);
  gameArray[gameIndex] = regame;

  timers[gameIndex] = setInterval(
    () => myTimer(gameArray[gameIndex], io),
    1000
  )

  io.to(game.roomCode).emit(Event.PLAY_GAME, regame);
}
