import ILevelInfo from 'shared/domain/entities/ILevelInfo';
import IRank from 'shared/domain/entities/IRank';
import ITheme from 'shared/domain/entities/ITheme';
import IUser from 'shared/domain/entities/IUser';

export default interface IGame {
  id: string;
  name: string;
  description: string;
  theme: ITheme;
  image?: string;
  image_url?: string;
  administrators: string[] | IUser[];
  levelInfo: ILevelInfo[] | null;
  newRegisters: number;
  ranks: IRank[] | null;
}
