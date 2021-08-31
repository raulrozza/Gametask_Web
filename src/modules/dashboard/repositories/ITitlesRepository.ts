import ICreateTitleDTO from 'modules/dashboard/domain/dtos/ICreateTitleDTO';
import ITitle from 'modules/dashboard/domain/entities/ITitle';

export default interface ITitlesRepository {
  findAllWithName(name?: string): Promise<ITitle[]>;
  create(data: ICreateTitleDTO): Promise<ITitle>;
}
