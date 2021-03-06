import { Server } from "socket.io";
import { Game, Event } from "./Interfaces";

export function myTimer(game: Game, io: Server) {
  game.timer--;
  if (game.timer === 0) {
    game.timer = game.maxTimer;
    game.currentPlayer = 1 - game.currentPlayer;
  }
  io.to(game.roomCode).emit(Event.PLAY_GAME, game);
}
