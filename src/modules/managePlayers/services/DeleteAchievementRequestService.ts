import IAchievementRequestsRepository from 'modules/managePlayers/domain/repositories/IAchievementRequestsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class DeleteAchievementRequestService {
  constructor(
    private achievementRequestsRepository: IAchievementRequestsRepository,
  ) {}

  public async execute(id: string): Promise<IExecute> {
    try {
      await this.achievementRequestsRepository.delete(id);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
