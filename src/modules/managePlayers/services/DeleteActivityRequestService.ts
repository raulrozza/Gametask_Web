import IActivityRequestsRepository from 'modules/managePlayers/domain/repositories/IActivityRequestsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class DeleteActivityRequestService {
  constructor(
    private activityRequestsRepository: IActivityRequestsRepository,
  ) {}

  public async execute(id: string): Promise<IExecute> {
    try {
      await this.activityRequestsRepository.delete(id);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
