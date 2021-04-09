import ILevelInfo from 'shared/entities/ILevelInfo';
import IRank from 'shared/entities/IRank';

export default interface IUpdateGameDTO {
  name: string;
  description: string;
  image: File | string;
  primary: string;
  secondary: string;
  levelInfo: ILevelInfo[];
  ranks: IRank[];
}
