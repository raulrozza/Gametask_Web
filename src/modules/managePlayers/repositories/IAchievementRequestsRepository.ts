import IGrantAchievementDTO from 'modules/managePlayers/dtos/IGrantAchievementDTO';
import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';

export default interface IAchievementRequestsRepository {
  delete(id: string): Promise<void>;
  grant(payload: IGrantAchievementDTO): Promise<void>;
  findAllFromGame(): Promise<IAchievementRequest[]>;
}
