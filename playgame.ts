import { Player, Event, PlayerType, Position } from "./Interfaces/index";
import { Server } from "socket.io";
import gameArray, { timers } from "./game";
import { findGame } from "./findgame";
import { comparePosition, isNearbyPosition } from "./check";

function playGame(updatedPlayer: Player, io: Server) {
  const updatedPlayerId = updatedPlayer.id;
  const gameIndex = gameArray.findIndex((game) =>
    game.players.find((player) => updatedPlayer.id === player.id)
  );
  const currentGame = gameArray[gameIndex];
  let playerIndex = currentGame?.players.findIndex(
    (player) => player.id === updatedPlayerId
  );
  const nearbyPosition = isNearbyPosition(
    updatedPlayer.position as Position,
    currentGame.players[playerIndex].position as Position
  );
  if (
    playerIndex !== undefined &&
    nearbyPosition &&
    !currentGame.obstaclePositions.find((obsPosition) =>
      comparePosition(updatedPlayer.position, obsPosition.x, obsPosition.y)
    ) &&
    currentGame?.currentPlayer === updatedPlayer.playerType
  ) {
    currentGame!.players[playerIndex as number] = updatedPlayer;
    currentGame.currentPlayer = 1 - currentGame.currentPlayer;
    if (
      comparePosition(
        currentGame!.players[1 - playerIndex].position,
        updatedPlayer.position!.x,
        updatedPlayer.position!.y
      )
    ) {
      clearInterval(timers[gameIndex] as NodeJS.Timeout);
      currentGame.winner = PlayerType.WARDER;
    }
    if (
      updatedPlayer.playerType === PlayerType.PRISONER &&
      comparePosition(
        currentGame.exitPosition,
        updatedPlayer.position!.x,
        updatedPlayer.position!.y
      )
    ) {
      clearInterval(timers[gameIndex] as NodeJS.Timeout);
      currentGame.winner = PlayerType.PRISONER;
    }
    currentGame.timer = 10;
    io.to(currentGame?.roomCode || "").emit(Event.PLAY_GAME, currentGame);
  }
}
export default playGame;
