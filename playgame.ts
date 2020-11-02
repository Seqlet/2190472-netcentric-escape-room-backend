import { Player, Event, PlayerType, Position } from "./Interfaces/index";
import { Server } from "socket.io";
import gameArray, { timers } from "./game";
import { comparePosition, isNearbyPosition } from "./check";

function playGame(updatedPlayer: Player, io: Server) {
  if (updatedPlayer.playerType !== PlayerType.SPECTATOR) {
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
    console.log(
      "dsfd",
      playerIndex,
      nearbyPosition,
      updatedPlayer.position,
      currentGame.players[playerIndex].position
    );
    if (
      playerIndex !== undefined &&
      nearbyPosition &&
      !currentGame.obstaclePositions.find((obsPosition) =>
        comparePosition(updatedPlayer.position, obsPosition.x, obsPosition.y)
      ) &&
      currentGame?.currentPlayer === updatedPlayer.playerType
    ) {
      console.log("???", nearbyPosition);
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
        timers[gameIndex] = null;
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
        timers[gameIndex] = null;
        currentGame.winner = PlayerType.PRISONER;
      }
      currentGame.timer = 10;
      io.to(currentGame?.roomCode || "").emit(Event.PLAY_GAME, currentGame);
    }
  }
}

export default playGame;
