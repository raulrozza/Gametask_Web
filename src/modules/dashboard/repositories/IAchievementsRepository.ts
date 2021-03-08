import ICreateAchievementDTO from 'modules/dashboard/dtos/ICreateAchievementDTO';
import IEditAchievementDTO from 'modules/dashboard/dtos/IEditAchievementDTO';
import IAchievement from 'modules/dashboard/entities/IAchievement';

export default interface IAchievementsRepository {
  findAll(): Promise<IAchievement[]>;
  create(data: ICreateAchievementDTO): Promise<IAchievement>;
  edit(data: IEditAchievementDTO): Promise<IAchievement>;
}
