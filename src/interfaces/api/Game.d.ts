import { IPlayer, IRank, IUser } from 'interfaces';

interface ILevelInfo {
  level: number;
  requiredExperience: number;
  title: string;
}

interface IRankingItem {
  currentExperience: number;
  player: IPlayer;
}

export interface IGame {
  _id: string;
  id: string;
  name: string;
  description: string;
  administrators: IUser[];
  image?: string;
  image_url: string;
  weeklyRanking: IRankingItem[];
  ranks: IRank[];
  levelInfo: ILevelInfo[];
  theme: {
    primary: string;
    secondary: string;
  };
  newRegisters: number;
}
