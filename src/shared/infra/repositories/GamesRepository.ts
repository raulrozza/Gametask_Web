import IGamesRepository from 'shared/domain/repositories/IGamesRepository';
import { makeHttpProvider } from 'shared/container/providers';
import IGame from 'shared/domain/entities/IGame';

interface ICreate {
  name: string;
  description: string;
  image: File | string;
}

export default class GamesRepository implements IGamesRepository {
  private httpProvider = makeHttpProvider();

  public async findAll(): Promise<IGame[]> {
    const response = await this.httpProvider.get<IGame[]>('games');

    return response;
  }

  public async findOne(): Promise<IGame> {
    const response = await this.httpProvider.get<IGame>('games/details');

    return response;
  }

  public async create({ name, description, image }: ICreate): Promise<IGame> {
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
