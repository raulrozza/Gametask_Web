import ICreateTitleDTO from 'modules/managePlayers/dtos/ICreateTitleDTO';
import IEditTitleDTO from 'modules/managePlayers/dtos/IEditTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';

export default interface ITitlesRepository {
  findAll(): Promise<ITitle[]>;
  create(data: ICreateTitleDTO): Promise<ITitle>;
  edit(data: IEditTitleDTO): Promise<ITitle>;
  delete(id: string): Promise<void>;
}
