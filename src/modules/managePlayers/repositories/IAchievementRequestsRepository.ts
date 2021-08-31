import IGrantAchievementDTO from 'modules/managePlayers/domain/dtos/IGrantAchievementDTO';
import IAchievementRequest from 'modules/managePlayers/domain/entities/IAchievementRequest';

export default interface IAchievementRequestsRepository {
  delete(id: string): Promise<void>;
  grant(payload: IGrantAchievementDTO): Promise<void>;
  findAllFromGame(): Promise<IAchievementRequest[]>;
}
