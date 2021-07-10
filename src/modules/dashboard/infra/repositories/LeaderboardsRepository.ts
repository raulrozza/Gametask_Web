import ILeaderboardsRepository from 'modules/dashboard/repositories/ILeaderboardsRepository';
import { makeHttpProvider } from 'shared/container/providers';
import ILeaderboard from 'shared/entities/ILeaderboard';

export default class LeaderboardsRepository implements ILeaderboardsRepository {
  private httpProvider = makeHttpProvider();

  public async findCurrent(): Promise<ILeaderboard | null> {
    const response = await this.httpProvider.get<ILeaderboard | undefined>(
      'leaderboards',
    );

    return response || null;
  }

  public async reset(): Promise<void> {
    await this.httpProvider.post('leaderboards/reset');
  }
}
