import ILevelInfo from 'shared/entities/ILevelInfo';
import IRank from 'shared/entities/IRank';
import ITheme from 'shared/entities/ITheme';
import IUser from 'shared/entities/IUser';

export default interface IGame {
  id: string;
  name: string;
  description: string;
  theme?: ITheme;
  image?: string;
  administrators: string[] | IUser[];
  levelInfo: ILevelInfo[];
  newRegisters?: number;
  ranks: IRank[];
}
