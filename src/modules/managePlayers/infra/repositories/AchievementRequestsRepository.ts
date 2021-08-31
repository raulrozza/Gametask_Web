import IGrantAchievementDTO from 'modules/managePlayers/domain/dtos/IGrantAchievementDTO';
import IAchievementRequest from 'modules/managePlayers/domain/entities/IAchievementRequest';
import IAchievementRequestsRepository from 'modules/managePlayers/repositories/IAchievementRequestsRepository';
import makeHttpProvider from 'shared/domain/providers/factories/makeHttpProvider';

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
