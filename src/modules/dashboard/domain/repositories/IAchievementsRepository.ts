import ICreateAchievementDTO from 'modules/dashboard/domain/dtos/ICreateAchievementDTO';
import IEditAchievementDTO from 'modules/dashboard/domain/dtos/IEditAchievementDTO';
import IAchievement from 'modules/dashboard/domain/entities/IAchievement';

export default interface IAchievementsRepository {
  findAll(): Promise<IAchievement[]>;
  create(data: ICreateAchievementDTO): Promise<IAchievement>;
  delete(id: string): Promise<void>;
  edit(data: IEditAchievementDTO): Promise<IAchievement>;
}
