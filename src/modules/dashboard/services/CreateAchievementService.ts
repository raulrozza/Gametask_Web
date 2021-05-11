import ICreateAchievementDTO from 'modules/dashboard/dtos/ICreateAchievementDTO';
import IAchievement from 'modules/dashboard/entities/IAchievement';
import IAchievementsRepository from 'modules/dashboard/repositories/IAchievementsRepository';

interface IExecute {
  achievement?: IAchievement;
  error?: string;
  shouldLogout?: boolean;
}

export default class CreateAchievementService {
  constructor(private achievementsRepository: IAchievementsRepository) {}

  public async execute(data: ICreateAchievementDTO): Promise<IExecute> {
    try {
      const achievement = await this.achievementsRepository.create(data);

      return { achievement };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
