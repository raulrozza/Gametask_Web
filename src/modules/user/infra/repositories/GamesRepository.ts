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

  public async create({
    name,
    description,
    image,
  }: ICreateGameDTO): Promise<IGame> {
    const game = await this.httpProvider.post<IGame>('games', {
      name,
      description,
    });

    const data = new FormData();
    data.append('image', image);

    const response = await this.httpProvider.patch<IGame>(
      'games/avatar',
      data,
      {
        headers: {
          'x-game-id': game.id,
        },
      },
    );

    return response;
  }
}
