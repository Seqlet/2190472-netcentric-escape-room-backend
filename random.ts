import { customAlphabet, nanoid } from "nanoid";

/**
 * function random number based on size ex: size = 10; random from 0-9
 * @param size
 */
function random(size: number) {
  return Math.floor(Math.random() * size);
}
export default random;

export function randomID() {
  const nanoid = customAlphabet("1234567890ABCDEF", 4);
  return nanoid();
}
