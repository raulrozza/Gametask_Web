import IActivityRequestsRepository from 'modules/managePlayers/repositories/IActivityRequestsRepository';
import { IActivityRequest } from 'modules/managePlayers/view/pages/General/types';

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
