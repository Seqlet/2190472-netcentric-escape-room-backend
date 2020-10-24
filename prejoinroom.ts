import { Game, Player, Event } from "./Interfaces/index";
import { Server, Socket } from 'socket.io';
import gameArray from "./game";

function prejoinRoom(roomCode:String, socket: Socket) {
  console.log("prejoin room: " + roomCode);
  if (gameArray.find((room) => room.roomCode === roomCode)) {
    socket.emit(Event.PREJOIN_ROOM, roomCode);
  } else {
    socket.emit(Event.PREJOIN_ROOM, null);
  }
}

export default prejoinRoom;
