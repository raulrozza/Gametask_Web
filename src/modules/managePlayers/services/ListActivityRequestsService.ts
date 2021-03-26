import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';
import IActivityRequestsRepository from 'modules/managePlayers/repositories/IActivityRequestsRepository';

interface IExecute {
  activityRequests?: IActivityRequest[];
  error?: string;
  shouldLogout?: boolean;
}

export default class ListActivityRequestsService {
  constructor(
    private activityRequestsRepository: IActivityRequestsRepository,
  ) {}

  public async execute(): Promise<IExecute> {
    try {
      const activityRequests = await this.activityRequestsRepository.findAllFromGame();

      return { activityRequests };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}