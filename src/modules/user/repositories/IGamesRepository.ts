import IGame from 'shared/entities/IGame';

export default interface IGamesRepository {
  findAll(): Promise<IGame[]>;
}
