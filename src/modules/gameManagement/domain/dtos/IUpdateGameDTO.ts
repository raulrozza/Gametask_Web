import ILevelInfo from 'shared/domain/entities/ILevelInfo';
import IRank from 'shared/domain/entities/IRank';

export default interface IUpdateGameDTO {
  name: string;
  description: string;
  image: File | string;
  primary: string;
  secondary: string;
  levelInfo: ILevelInfo[];
  ranks: IRank[];
}
