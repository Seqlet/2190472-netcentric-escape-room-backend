import { JoinRoom, Position } from "./Interfaces/index";
import { Game, Event, Player, HatType, PlayerType } from "./Interfaces";
import { randomID, random, randomPos} from "./random";
import { Server } from 'socket.io';

let gameArray: Game[] = [];

function joinRoom({playerName,roomCode}: JoinRoom, io: Server) {
  console.log("Name: " + playerName);
  const game = gameArray.find((room) => room.roomCode === roomCode);
  let secPlayerType= PlayerType.SPECTATOR;
  if (game){
    const numPlayer = game.players.length
    if (numPlayer === 1){
      const firstPlayerType = game.players[0].playerType ;
      secPlayerType = 1 - firstPlayerType;
    }else if(numPlayer < 1){
      throw new Error("Player Number Wrong!");
    }
    let player2: Player = {
      id: randomID(),
      name: playerName,
      hatType: HatType.NEW,
      playerType: secPlayerType,
      position: randomPos(game),
      victory: 0,
    };
    game.players.push(player2);
    io.emit(Event.JOIN_ROOM,player2)
  }
}
export default joinRoom;
