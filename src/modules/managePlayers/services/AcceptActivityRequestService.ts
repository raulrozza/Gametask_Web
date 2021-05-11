import IActivityRequestsRepository from 'modules/managePlayers/repositories/IActivityRequestsRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class AcceptActivityRequestService {
  constructor(
    private activityRequestsRepository: IActivityRequestsRepository,
  ) {}

  public async execute(id: string): Promise<IExecute> {
    try {
      await this.activityRequestsRepository.accept(id);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
