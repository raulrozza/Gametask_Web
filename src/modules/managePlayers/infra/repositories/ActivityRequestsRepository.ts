import IActivityRequestsRepository from 'modules/managePlayers/repositories/IActivityRequestsRepository';
import { IActivityRequest } from 'modules/managePlayers/view/pages/General/types';
import { makeHttpProvider } from 'shared/container/providers';

export default class ActivityRequestsRepository
  implements IActivityRequestsRepository {
  private httpProvider = makeHttpProvider();

  public async accept(id: string): Promise<void> {
    await this.httpProvider.patch(`requests/activities/${id}/complete`);
  }

  public async delete(id: string): Promise<void> {
    await this.httpProvider.patch(`requests/activities/${id}`);
  }

  public async findAllFromGame(): Promise<IActivityRequest[]> {
    return this.httpProvider.get('requests/activities');
  }
}
