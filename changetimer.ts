import { SetTimer } from './Interfaces/index';
import { Server } from "socket.io";
import { Event } from "./Interfaces";
import gameArray from "./game";
import { findGame } from "./findgame";

export function changeTimer( {player,timer}:SetTimer, io: Server) {
    const currentGame = findGame(gameArray, player);
    currentGame!.timer = timer;
    currentGame!.maxTimer = timer;
    io.to(currentGame?.roomCode || "").emit(Event.JOIN_LOBBY, currentGame);
}