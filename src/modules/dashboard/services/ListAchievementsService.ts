import IAchievementsRepository from 'modules/dashboard/domain/repositories/IAchievementsRepository';
import IAchievement from 'modules/dashboard/domain/entities/IAchievement';

interface IExecute {
  achievements?: IAchievement[];
  error?: string;
  shouldLogout?: boolean;
}

export default class ListAchievementsService {
  constructor(private achievementsRepository: IAchievementsRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      const achievements = await this.achievementsRepository.findAll();

      return { achievements };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
