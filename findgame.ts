import { Game, Player } from "./Interfaces";

export function findGame(gamewa: Game[], player: Player) {
    const currentGame = gamewa.find((game) =>
      game.players.every((user) => user.id === player.id)
    );
    return currentGame;
  }
  