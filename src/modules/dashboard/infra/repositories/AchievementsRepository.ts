import IAchievement from 'modules/dashboard/entities/IAchievement';
import IAchievementsRepository from 'modules/dashboard/repositories/IAchievementsRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class AchievementsRepository implements IAchievementsRepository {
  private httpProvider = makeHttpProvider();

  public async findAll(): Promise<IAchievement[]> {
    const response = await this.httpProvider.get<IAchievement[]>(
      'achievements',
    );

    return response;
  }
}
