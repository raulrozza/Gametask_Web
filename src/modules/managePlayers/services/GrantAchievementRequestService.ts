import IGrantAchievementDTO from 'modules/managePlayers/dtos/IGrantAchievementDTO';
import IAchievementRequestsRepository from 'modules/managePlayers/repositories/IAchievementRequestsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class GrantAchievementRequestService {
  constructor(
    private achievementRequestsRepository: IAchievementRequestsRepository,
  ) {}

  public async execute(payload: IGrantAchievementDTO): Promise<IExecute> {
    try {
      await this.achievementRequestsRepository.grant(payload);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
