import ICreateGameDTO from 'modules/user/dtos/ICreateGameDTO';
import IGamesRepository from 'modules/user/repositories/IGamesRepository';
import { makeHttpProvider } from 'shared/container/providers';
import IGame from 'shared/entities/IGame';

export default class GamesRepository implements IGamesRepository {
  private httpProvider = makeHttpProvider();

  public async findAll(): Promise<IGame[]> {
    const response = await this.httpProvider.get<IGame[]>('games');

    return response;
  }

  public async create(values: ICreateGameDTO): Promise<IGame> {
    const data = new FormData();

    data.append('name', values.name);
    data.append('description', values.description);
    data.append('image', values.image);

    const response = await this.httpProvider.post<IGame>('/game', data);

    return response;
  }
}
