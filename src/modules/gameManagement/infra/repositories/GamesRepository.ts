import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';
import IGamesRepository from 'modules/gameManagement/repositories/IGamesRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class GamesRepository implements IGamesRepository {
  private httpProvider = makeHttpProvider();

  public async update({
    name,
    image,
    description,
    primary,
    secondary,
  }: IUpdateGameDTO): Promise<void> {
    await this.httpProvider.put('games', {
      name,
      description,
      theme: {
        primary,
        secondary,
      },
    });

    if (typeof image === 'string') return;

    const data = new FormData();
    data.append('image', image);

    await this.httpProvider.patch('games/avatar', data);
  }
}
