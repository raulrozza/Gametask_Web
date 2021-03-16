import ICreateTitleDTO from 'modules/managePlayers/dtos/ICreateTitleDTO';
import IUpdateTitleDTO from 'modules/managePlayers/dtos/IUpdateTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';

export default interface ITitlesRepository {
  findAll(): Promise<ITitle[]>;
  create(data: ICreateTitleDTO): Promise<ITitle>;
  edit(data: IUpdateTitleDTO): Promise<ITitle>;
}
