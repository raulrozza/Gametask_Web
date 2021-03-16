import ICreateTitleDTO from 'modules/managePlayers/dtos/ICreateTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';

export default interface ITitlesRepository {
  findAll(): Promise<ITitle[]>;
  create(data: ICreateTitleDTO): Promise<ITitle>;
}
