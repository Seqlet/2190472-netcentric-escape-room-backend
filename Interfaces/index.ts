export enum PlayerType {
  WARDER,
  PRISONER,
  SPECTATOR,
}

export interface Position {
  x: number;
  y: number;
}

export enum HatType {
  OLD,
  NEW,
}

export interface Player {
  id: string;
  name: string;
  hatType: HatType;
  playerType: PlayerType;
  position: Position | null;
  victory: number;
}

export interface Game {
  exitPosition: Position;
  obstaclePositions: Array<Position>;
  timer: number;
  maxTimer:number;
  winner: PlayerType | null;
  currentPlayer: PlayerType;
  roomCode: string;
  players: Array<Player>;
}

export enum Event {
  CREATE_GAME = "create game",
  FIND_LOBBY = "find lobby",
  JOIN_ROOM = "join room",
  PLAY_GAME = "play game",
  RESET_GAME = "reset game",
  JOIN_LOBBY = "join lobby",
  CHANGE_COSTUME = "change costume",
  CHANGE_TIMER = "change timer",
  PLAY_AGAIN = "play again",
}

export interface JoinRoom {
  playerName: string;
  roomCode: string;
}

export interface SetTimer {
  player: Player;
  timer: number;
}