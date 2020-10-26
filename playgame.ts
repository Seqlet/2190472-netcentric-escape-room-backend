import { Game, Player, Event } from "./Interfaces/index";
import {  Socket } from "socket.io";
import gameArray from "./game";

function playGame(updatedPlayer: Player, socket: Socket) {
  const updatedPlayerId = updatedPlayer.id;
  const currentGame = findGame(gameArray, updatedPlayer);
  let playerIndex = currentGame?.players.findIndex(
    (player) => player.id === updatedPlayerId
  );
  if (playerIndex !== null) {
    currentGame!.players[playerIndex as number] = updatedPlayer;
  }
  socket.emit(Event.PLAY_GAME, currentGame);
}
export default playGame;

export function findGame(gamewa: Game[], player: Player) {
  const currentGame = gamewa.find((game) =>
    game.players.every((user) => user.id === player.id)
  );
  return currentGame;
}
