import IGame from 'shared/domain/entities/IGame';
import ICreateGameDTO from 'modules/user/dtos/ICreateGameDTO';

export default interface IGamesRepository {
  findAll(): Promise<IGame[]>;
  findOne(): Promise<IGame>;
  create(values: ICreateGameDTO): Promise<IGame>;
}
