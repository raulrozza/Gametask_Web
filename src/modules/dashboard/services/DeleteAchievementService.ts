import IAchievementsRepository from 'modules/dashboard/repositories/IAchievementsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class DeleteAchievementService {
  constructor(private achievementsRepository: IAchievementsRepository) {}

  public async execute(id: string): Promise<IExecute> {
    try {
      await this.achievementsRepository.delete(id);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
