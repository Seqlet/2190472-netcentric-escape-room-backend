import { Socket } from "socket.io";
import { Player,Event } from "./Interfaces";
import gameArray from "./game";
import { findGame } from "./findgame";

export function changeCostume(player: Player, socket: Socket) {
  const currentGame = findGame(gameArray, player);
  let playerIndex = currentGame?.players.findIndex(
    (user) => user.id === player.id
  );
  if (playerIndex !== null) {
    currentGame!.players[playerIndex as number] = player;
  }
  socket.emit(Event.CHANGE_COSTUME, currentGame);
}