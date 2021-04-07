import ILevelInfo from 'shared/entities/ILevelInfo';

export default interface ILevelContainer {
  levels: ILevelInfo[];
  addLevel(): void;
}
