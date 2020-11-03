import { PlayerType } from './Interfaces/index';
import { Socket } from 'socket.io';
import { Game,Event } from './Interfaces';
import playGame from './playgame';

export function endGame(game : Game, socket: Socket){
    if (game.players[0].position === game.players[1].position){
        const winner = game.currentPlayer;
        game.players[winner].victory+=1;
        game.timer = game.maxTimer;
        game.winner = winner;
        socket.emit(Event.JOIN_LOBBY, game.players[winner])
    }else if(game.players[1].position === game.exitPosition){
        game.players[1].victory+=1;
        game.timer = game.maxTimer;
        game.winner = PlayerType.PRISONER;
        socket.emit(Event.JOIN_LOBBY, game.players[1])
    }
}