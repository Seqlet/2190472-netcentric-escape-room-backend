import { Game, Player, Event } from "./Interfaces/index";
import { Server } from "socket.io";
import gameArray from "./game";

function prejoinRoom(roomCode: String, io: Server) {
  console.log("prejoin room: " + roomCode);
  if (gameArray.find((room) => room.roomCode === roomCode)) {
    io.emit(Event.PREJOIN_ROOM, roomCode);
  } else {
    io.emit(Event.PREJOIN_ROOM, null);
  }
}

export default prejoinRoom;
