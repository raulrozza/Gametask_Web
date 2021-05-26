import ILeaderboardsRepository from 'modules/dashboard/repositories/ILeaderboardsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class ResetLeaderboardsService {
  constructor(private leaderboardsRepository: ILeaderboardsRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      await this.leaderboardsRepository.reset();

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
