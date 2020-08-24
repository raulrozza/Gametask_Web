declare module 'game' {
  import { IUser } from 'authorization';
  import { IColorPallete } from 'theme';

  export interface IRank {
    color: string;
    level: number;
    name: string;
    tag: string;
  }

  export interface ITitle {
    _id: string;
    name: string;
  }

  export interface IActivity {
    _id: string;
    name: string;
    experience: number;
    description: string;
    dmRules?: string;
  }

  export interface IAchievement {
    _id: string;
    name: string;
    description: string;
    image?: string | null;
    image_url: string;
    title?: ITitle | null;
  }

  export interface IPlayer {
    _id: string;
    experience: number;
    level: number;
    currentTitle: {
      name: string;
    };
    achievements: IAchievement[];
    rank: IRank;
    user: IUser;
    [key: string]: string;
  }

  export interface ILevelInfo {
    level: number;
    requiredExperience: number;
    title: string;
  }

  export interface IRankingItem {
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
    theme: IColorPallete;
    newRegisters: number;
  }

  export interface IGameHook {
    game: IGame;
    loading: boolean;
    switchGame: (game?: IGame) => void;
    refreshGame: () => Promise<void>;
  }
}
