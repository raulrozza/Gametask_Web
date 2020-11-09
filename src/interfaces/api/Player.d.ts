import { IAchievement } from './Achievement';
import { IRank } from './Rank';
import { ITitle } from './Title';
import { IUser } from './User';

export interface IPlayer {
  _id: string;
  experience: number;
  level: number;
  currentTitle: ITitle;
  achievements: IAchievement[];
  rank: IRank;
  user: IUser;
  // [key: string]: string;
}
