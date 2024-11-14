export interface PlayerProps {
  x: number;
  y: number;
}

export interface GameState {
  player: {
    x: number;
    y: number;
    vy: number;
    onGround: boolean;
  };
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Item {
  x: number;
  y: number;
  collected: boolean;
}