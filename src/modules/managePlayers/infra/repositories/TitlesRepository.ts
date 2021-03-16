import ICreateTitleDTO from 'modules/managePlayers/dtos/ICreateTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';
import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class TitlesRepository implements ITitlesRepository {
  private httpProvider = makeHttpProvider();

  public async create({ name }: ICreateTitleDTO): Promise<ITitle> {
    const response = await this.httpProvider.post<ITitle>('titles', {
      name,
    });

    return response;
  }

  public async findAll(): Promise<ITitle[]> {
    const response = await this.httpProvider.get<ITitle[]>('titles');

    return response;
  }
}
