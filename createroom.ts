import  {random, randomID, randomPos } from "./random";
import { Player, HatType, Game, Event } from "./Interfaces/index";
import { Server } from 'socket.io';
import gameArray  from './game'

function createGame(playerName: string, io: Server) {
  let randomRoomcode = randomID()
  while(gameArray.find(game => game.roomCode === randomRoomcode)) {
    randomRoomcode = randomID()
  } 
  
  let game: Game = {
    exitPosition: { x: random(5), y: random(5) },
    obstaclePositions: [],
    timer: 10,
    winner: null,
    currentPlayer: random(2),
    roomCode: randomRoomcode,
    players: []
  };

    let player1: Player = {
      id: randomID(),
      name: playerName,
      hatType: HatType.OLD,
      playerType: random(2),
      position: randomPos(game),
      victory: 0
    };

    game.players.push(player1)

    for (let i = 0; i < 5; i++) {
      game.obstaclePositions.push(randomPos(game));
    }

    gameArray.push(game)

    io.emit(Event.CREATE_GAME, player1)
}


export default createGame