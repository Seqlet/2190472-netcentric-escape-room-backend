import { Server } from "socket.io";
import gameArray, { timers } from "./game";
import { Game, Event, PlayerType } from "./Interfaces";
import { random, randomPos } from "./random";

export function resetGame(game: Game, io: Server) {
  let regame: Game = {
    exitPosition: { x: random(5), y: random(5) },
    obstaclePositions: [],
    timer: game.maxTimer,
    maxTimer: game.maxTimer,
    winner: null,
    currentPlayer: PlayerType.WARDER,
    roomCode: game.roomCode,
    players: [],
  };
  for (let i = 0; i < 5; i++) {
    regame.obstaclePositions.push(randomPos(regame));
  }

  regame.players = game.players;
  regame.players[0].position = randomPos(regame);
  regame.players[0].victory = 0;
  regame.players[0].playerType = 1 - regame.players[0].playerType;
  regame.players[1].position = randomPos(regame);
  regame.players[1].victory = 0;
  regame.players[1].playerType = 1 - regame.players[1].playerType;

  const gameIndex = gameArray.findIndex((game) => game.roomCode);
  gameArray[gameIndex] = regame;

  clearInterval(timers[gameIndex] as NodeJS.Timeout);
  timers[gameIndex] = null;

  io.to(game.roomCode).emit(Event.JOIN_LOBBY, regame);
}
