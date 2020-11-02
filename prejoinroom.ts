import { Event } from "./Interfaces/index";
import { Socket } from "socket.io";
import gameArray from "./game";

function prejoinRoom(roomCode: String, socket: Socket) {
  if (gameArray.find((room) => room.roomCode === roomCode)) {
    socket.emit(Event.FIND_LOBBY, roomCode);
  } else {
    socket.emit(Event.FIND_LOBBY, null);
  }
}

export default prejoinRoom;
