import { Game, Player,Event } from "./Interfaces/index";
import { Server } from "socket.io";
import gameArray from "./game";

function playGame(updatedPlayer: Player, io: Server) {
  const updatedPlayerId = updatedPlayer.id;
//   const camparedId = () => 
  const currentGame = findGame(gameArray,updatedPlayer);
  let playerInGame = currentGame?.players.find(
    (player) => player.id === updatedPlayerId
  );
  playerInGame = updatedPlayer;
  io.emit(Event.PLAY_GAME, currentGame);
}
export default playGame;

export function findGame(gamewa : Game[],player: Player){
    const currentGame = gamewa.find((game) =>
    game.players.every((user) => user.id === player.id)
  );
  return currentGame;
}

