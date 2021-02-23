import IGamesRepository from 'modules/user/repositories/IGamesRepository';
import { makeHttpProvider } from 'shared/container/providers';
import IGame from 'shared/entities/IGame';

export default class GamesRepository implements IGamesRepository {
  private httpProvider = makeHttpProvider();

  public async findAll(): Promise<IGame[]> {
    const response = await this.httpProvider.get<IGame[]>('games');

    return response;
  }
}
