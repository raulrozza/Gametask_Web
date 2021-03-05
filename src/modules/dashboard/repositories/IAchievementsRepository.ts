import ICreateAchievementDTO from 'modules/dashboard/dtos/ICreateAchievementDTO';
import IAchievement from 'modules/dashboard/entities/IAchievement';

export default interface IAchievementsRepository {
  findAll(): Promise<IAchievement[]>;
  create(data: ICreateAchievementDTO): Promise<IAchievement>;
}
