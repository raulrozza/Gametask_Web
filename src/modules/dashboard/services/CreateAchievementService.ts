import ICreateAchievementDTO from 'modules/dashboard/domain/dtos/ICreateAchievementDTO';
import IAchievement from 'modules/dashboard/domain/entities/IAchievement';
import IAchievementsRepository from 'modules/dashboard/domain/repositories/IAchievementsRepository';

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
