import ICreateTitleDTO from 'modules/managePlayers/domain/dtos/ICreateTitleDTO';
import IEditTitleDTO from 'modules/managePlayers/domain/dtos/IEditTitleDTO';
import ITitle from 'modules/managePlayers/domain/entities/ITitle';

export default interface ITitlesRepository {
  findAll(): Promise<ITitle[]>;
  create(data: ICreateTitleDTO): Promise<ITitle>;
  edit(data: IEditTitleDTO): Promise<ITitle>;
  delete(id: string): Promise<void>;
}
