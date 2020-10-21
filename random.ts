import { Position } from "./Interfaces/index";
import { customAlphabet, nanoid } from "nanoid";
import { comparePosition } from "./check";
import { Game } from "./Interfaces";
/**
 * 
 * @param size 
 */
export function random(size: number) {
  return Math.floor(Math.random() * size);
}

export function randomID() {
  const nanoid = customAlphabet("1234567890ABCDEF", 4);
  return nanoid();
}

export function randomPos(gamewa: Game):Position {
  let x = random(5);
  let y = random(5);
  const comparedExit = () => comparePosition(gamewa.exitPosition, x, y);
  const comparedObst = () =>
    gamewa.obstaclePositions.every((position) =>
      comparePosition(position, x, y)
    );
  const comparedPlayer = () =>
    gamewa.players.every((player) => comparePosition(player.position, x, y));
  do {
    x = random(5);
    y = random(5);
  } while (comparedExit() && comparedObst() && comparedPlayer());

  return {x,y}
}
