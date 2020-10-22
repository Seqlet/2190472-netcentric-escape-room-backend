import { Position } from "./Interfaces/index";
export function comparePosition(
  position: Position | null,
  x: number,
  y: number
) {
  return position?.x === x && position?.y === y;
}
