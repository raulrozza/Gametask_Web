import IUpdateGameDTO from 'modules/gameManagement/domain/dtos/IUpdateGameDTO';
import IGamesRepository from 'modules/gameManagement/domain/repositories/IGamesRepository';
import makeHttpProvider from 'shared/domain/providers/factories/makeHttpProvider';

export default class GamesRepository implements IGamesRepository {
  private httpProvider = makeHttpProvider();

  public async update({
    name,
    image,
    description,
    primary,
    secondary,
    levelInfo,
    ranks,
  }: IUpdateGameDTO): Promise<void> {
    await this.httpProvider.put('games', {
      name,
      description,
      theme: {
        primary,
        secondary,
      },
      levelInfo,
      ranks,
    });

    if (typeof image === 'string') return;

    const data = new FormData();
    data.append('image', image);

    await this.httpProvider.patch('games/avatar', data);
  }
}
