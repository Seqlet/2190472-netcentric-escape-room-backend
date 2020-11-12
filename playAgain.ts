import { Server } from "socket.io";
import gameArray, { timers } from "./game";
import { Game, Event, PlayerType } from "./Interfaces";
import { random, randomPos } from "./random";
import { myTimer } from "./timer";

export function playAgain(game: Game, io: Server) {
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

  const lastWinnerIndex = game.players.findIndex(
    (player) => game.winner === player.playerType
  );

  regame.players = game.players;
  regame.players[lastWinnerIndex].position = randomPos(regame);
  regame.players[lastWinnerIndex].playerType = PlayerType.WARDER;
  regame.players[1 - lastWinnerIndex].position = randomPos(regame);
  regame.players[1 - lastWinnerIndex].playerType = PlayerType.PRISONER;
  regame.currentPlayer = PlayerType.WARDER;

  const gameIndex = gameArray.findIndex((game) => game.roomCode);
  gameArray[gameIndex] = regame;

  if (timers[gameIndex] === null) {
    timers[gameIndex] = setInterval(
      () => myTimer(gameArray[gameIndex], io),
      1000
    );
  }

  io.to(game.roomCode).emit(Event.PLAY_GAME, regame);
}
