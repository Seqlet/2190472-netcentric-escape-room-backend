import { Game, HatType, Player } from "./Interfaces/index";
import { random, randomExitPos, randomID, randomPos } from "./random";

let gameArray: Game[] = [
  {
    exitPosition: randomExitPos(),
    obstaclePositions: [],
    timer: 10,
    winner: null,
    currentPlayer: random(1),
    roomCode: "ABCD",
    players: [],
  },
];

let playerMock: Player = {
  id: randomID(),
  name: "New",
  hatType: HatType.OLD,
  playerType: random(2),
  position: randomPos(gameArray[0]),
  victory: 0,
};

for (let i = 0; i < 5; i++) {
  gameArray[0].obstaclePositions.push(randomPos(gameArray[0]));
}

gameArray[0].players.push(playerMock);

export default gameArray;
