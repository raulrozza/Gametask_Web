import { IAchievement, IRank, ITitle, IUser } from 'interfaces';

export interface IPlayer {
  _id: string;
  experience: number;
  level: number;
  currentTitle: ITitle;
  achievements: IAchievement[];
  rank: IRank;
  user: IUser;
}
