import IAchievement from 'modules/dashboard/entities/IAchievement';

export default interface IAchievementsRepository {
  findAll(): Promise<IAchievement[]>;
}
