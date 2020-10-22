import { Game, Player, Event } from "./Interfaces/index";
import { Server } from 'socket.io';
import gameArray from "./mock";

function prejoinRoom(roomCode:String, io : Server) {
  console.log("prejoin room: " + roomCode);
  if (gameArray.find((room) => room.roomCode === roomCode)) {
    io.emit(Event.PREJOIN_ROOM, true);
  } else {
    io.emit(Event.PREJOIN_ROOM, false);
  }
}

export default prejoinRoom;
