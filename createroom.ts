import { random, randomID, randomPos } from "./random";
import { Player, HatType, Game, Event, PlayerType } from "./Interfaces/index";
import { Socket, Server } from "socket.io";
import gameArray, { timers } from "./game";

function createGame(playerName: string, socket: Socket, io: Server) {
  let randomRoomcode = randomID();

  while (gameArray.find((game) => game.roomCode === randomRoomcode)) {
    randomRoomcode = randomID();
  }

  let game: Game = {
    exitPosition: { x: random(5), y: random(5) },
    obstaclePositions: [],
    timer: 10,
    maxTimer: 10,
    winner: null,
    currentPlayer: PlayerType.WARDER,
    roomCode: randomRoomcode,
    players: [],
  };

  let player1: Player = {
    id: randomID(),
    name: playerName,
    hatType: HatType.OLD,
    playerType: random(2),
    position: randomPos(game),
    victory: 0,
  };

  game.players.push(player1);

  for (let i = 0; i < 5; i++) {
    game.obstaclePositions.push(randomPos(game));
  }
  gameArray.push(game);
  timers.push(null);

  socket.join(game.roomCode, () => {
    io.to(game.roomCode).emit(Event.JOIN_LOBBY, game);
  });
}

export default createGame;
