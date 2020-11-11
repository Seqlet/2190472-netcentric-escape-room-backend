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
      "Position",
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
      currentGame?.currentPlayer === updatedPlayer.playerType &&
        !(updatedPlayer.playerType === PlayerType.WARDER && comparePosition(updatedPlayer.position, currentGame.exitPosition.x, currentGame.exitPosition.y))
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
        timers[gameIndex] = null;
        currentGame.winner = PlayerType.WARDER;
        const winnerIndex = currentGame.players.findIndex(player => currentGame.winner === player.playerType)
        currentGame.players[winnerIndex].victory++;
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
            const winnerIndex = currentGame.players.findIndex(player => currentGame.winner === player.playerType)
            currentGame.players[winnerIndex].victory++;
      }
      currentGame.timer = currentGame.maxTimer;
      io.to(currentGame?.roomCode || "").emit(Event.PLAY_GAME, currentGame);
    }
  }
}

export default playGame;
