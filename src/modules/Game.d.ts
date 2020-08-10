declare module 'game' {
  import PropTypes from 'prop-types';
  import { IUser } from 'authorization';
  import { IColorPallete } from 'theme';

  export interface IRank {
    color: string;
    level: number;
    name: string;
    tag: string;
  }

  export interface ILevelInfo {
    level: number;
    requiredExperience: number;
    title: string;
  }

  export interface IRankingItem {
    currentExperience: number;
    user: IUser;
  }

  export interface IGame {
    _id: string;
    id: string;
    name: string;
    description: string;
    image?: string;
    image_url: string;
    weeklyRanking: IRankingItem[];
    ranks: IRank[];
    levelInfo: ILevelInfo[];
    theme: IColorPallete;
    newRegisters: number;
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

  export const ActivityProps = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    dmRules: PropTypes.string,
  });

  export interface IAchievement {
    _id: string;
    name: string;
    description: string;
    image: string | undefined;
    image_url: string;
    title?: ITitle;
    obtained?: boolean;
  }

  export const AchievementProps = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    obtained: PropTypes.bool,
  });

  export interface IGameHook {
    game: IGame;
    loading: boolean;
    achievements: IAchievement[];
    getPlayerRank: (user: IUser) => IRank;
  }
}
