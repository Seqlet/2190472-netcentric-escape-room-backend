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
    position: Position;
    victory: number;
  }
   
  export interface Game {
    exitPosition: Position;
    obstaclePositions: Array<Position>;
    timer: number;
    winner: PlayerType | null;
    currentPlayer: PlayerType;
    roomCode: string;
    players: Array<Player>;
  }