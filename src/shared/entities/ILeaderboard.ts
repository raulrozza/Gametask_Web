export interface IPosition {
  player: {
    level: number;
  };
  experience: number;
}

export default interface ILeaderboard {
  id: string;
  game: string;
  position: IPosition[];
  createdAt: Date;
  expiresAt?: Date;
}
