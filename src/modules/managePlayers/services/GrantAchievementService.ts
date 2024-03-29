import IGrantAchievementDTO from 'modules/managePlayers/domain/dtos/IGrantAchievementDTO';
import IAchievementRequestsRepository from 'modules/managePlayers/domain/repositories/IAchievementRequestsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class GrantAchievementService {
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
