import ICreateTitleDTO from 'modules/dashboard/dtos/ICreateTitleDTO';
import ITitle from 'modules/dashboard/entities/ITitle';

export default interface ITitlesRepository {
  findAllWithName(name?: string): Promise<ITitle[]>;
  create(data: ICreateTitleDTO): Promise<ITitle>;
}
