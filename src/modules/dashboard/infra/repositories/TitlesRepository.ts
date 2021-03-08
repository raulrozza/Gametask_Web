import ICreateTitleDTO from 'modules/dashboard/dtos/ICreateTitleDTO';
import ITitle from 'modules/dashboard/entities/ITitle';
import ITitlesRepository from 'modules/dashboard/repositories/ITitlesRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class TitlesRepository implements ITitlesRepository {
  private httpProvider = makeHttpProvider();

  public async create({ name }: ICreateTitleDTO): Promise<ITitle> {
    const response = await this.httpProvider.post<ITitle>('titles', {
      name,
    });

    return response;
  }

  public async findAllWithName(name?: string): Promise<ITitle[]> {
    const params = name ? { name } : {};

    const response = await this.httpProvider.get<ITitle[]>('titles', {
      params,
    });

    return response;
  }
}