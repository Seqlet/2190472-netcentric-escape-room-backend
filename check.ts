import { Position } from "./Interfaces/index";
export function comparePosition(
  position: Position | null,
  x: number,
  y: number
) {
  return position?.x === x && position?.y === y;
}

export const isNearbyPosition = (position1: Position, position2: Position) => {
  return (
    Math.abs(position1.x - position2.x) +
      Math.abs(position1.y - position2.y) ===
    1
  );
  
};
