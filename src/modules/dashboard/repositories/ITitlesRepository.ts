import ITitle from 'modules/dashboard/entities/ITitle';

export default interface ITitlesRepository {
  findAllWithName(name?: string): Promise<ITitle[]>;
  create(data: Pick<ITitle, 'name'>): Promise<ITitle>;
}
