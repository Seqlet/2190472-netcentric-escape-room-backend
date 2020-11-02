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
export function randomExitPos() {
  return { x: random(5), y: random(5) };
}

const comparedExit = (game: Game, x: number, y: number) =>
  comparePosition(game.exitPosition, x, y);

const comparedObst = (game: Game, x: number, y: number) =>
  game.obstaclePositions.find((position) => comparePosition(position, x, y));

const comparedPlayer = (game: Game, x: number, y: number) =>
  game.players.find((player) => comparePosition(player.position, x, y));

export function randomPos(game: Game): Position {
  let x = random(5);
  let y = random(5);
  do {
    x = random(5);
    y = random(5);
  } while (
    comparedExit(game, x, y) ||
    comparedObst(game, x, y) ||
    comparedPlayer(game, x, y)
  );

  return { x, y };
}
