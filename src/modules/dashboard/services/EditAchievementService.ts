import IEditAchievementDTO from 'modules/dashboard/dtos/IEditAchievementDTO';
import IAchievement from 'modules/dashboard/entities/IAchievement';
import IAchievementsRepository from 'modules/dashboard/repositories/IAchievementsRepository';

interface IExecute {
  achievement?: IAchievement;
  error?: string;
  shouldLogout?: boolean;
}

export default class EditAchievementService {
  constructor(private achievementsRepository: IAchievementsRepository) {}

  public async execute(data: IEditAchievementDTO): Promise<IExecute> {
    try {
      const achievement = await this.achievementsRepository.edit(data);

      return { achievement };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
