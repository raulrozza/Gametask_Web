import IGrantAchievementDTO from 'modules/managePlayers/dtos/IGrantAchievementDTO';
import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';
import IAchievementRequestsRepository from 'modules/managePlayers/repositories/IAchievementRequestsRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class AchievementRequestsRepository
  implements IAchievementRequestsRepository {
  private httpProvider = makeHttpProvider();

  public async delete(id: string): Promise<void> {
    await this.httpProvider.delete(`requests/achievements/${id}`);
  }

  public async grant({
    achievementId,
    playerId,
    userId,
    requestId,
  }: IGrantAchievementDTO): Promise<void> {
    const body = { achievementId, userId, requestId };

    await this.httpProvider.patch(`players/${playerId}/achievements`, body);
  }

  public async findAllFromGame(): Promise<IAchievementRequest[]> {
    return this.httpProvider.get('requests/achievements');
  }
}
