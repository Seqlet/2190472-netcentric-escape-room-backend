import { JoinRoom } from "./Interfaces/index";
import { Event, Player, HatType, PlayerType, Position } from "./Interfaces";
import { randomID, randomPos } from "./random";
import { Server } from "socket.io";
import gameArray from "./game";

function joinRoom({ playerName, roomCode }: JoinRoom, io: Server) {
  const game = gameArray.find((room) => room.roomCode === roomCode);
  let secPlayerType = PlayerType.SPECTATOR;
  let playerPos: Position | null = null;
  if (game) {
    const numPlayer = game.players.length;
    if (numPlayer === 1) {
      const firstPlayerType = game.players[0].playerType;
      secPlayerType = 1 - firstPlayerType;
      playerPos = randomPos(game);
    } else if (numPlayer < 1) {
      throw new Error("Player Number Wrong!");
    }
    let player2: Player = {
      id: randomID(),
      name: playerName,
      hatType: HatType.NEW,
      playerType: secPlayerType,
      position: playerPos,
      victory: 0,
    };
    game.players.push(player2);
    io.emit(Event.JOIN_ROOM, player2);
  }
}
export default joinRoom;
