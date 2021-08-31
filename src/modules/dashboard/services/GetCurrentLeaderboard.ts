import ILeaderboardsRepository from 'modules/dashboard/domain/repositories/ILeaderboardsRepository';
import ILeaderboard from 'shared/domain/entities/ILeaderboard';

interface IExecute {
  leaderboard?: ILeaderboard | null;
  error?: string;
  shouldLogout?: boolean;
}

export default class GetCurrentLeaderboard {
  constructor(private leaderboardsRepository: ILeaderboardsRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      const leaderboard = await this.leaderboardsRepository.findCurrent();

      return { leaderboard };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
