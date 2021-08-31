import IAchievementRequest from 'modules/managePlayers/domain/entities/IAchievementRequest';
import IAchievementRequestsRepository from 'modules/managePlayers/domain/repositories/IAchievementRequestsRepository';

interface IExecute {
  achievementRequests?: IAchievementRequest[];
  error?: string;
  shouldLogout?: boolean;
}

export default class ListAchievementRequestsService {
  constructor(
    private achievementRequestsRepository: IAchievementRequestsRepository,
  ) {}

  public async execute(): Promise<IExecute> {
    try {
      const achievementRequests = await this.achievementRequestsRepository.findAllFromGame();

      return { achievementRequests };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
