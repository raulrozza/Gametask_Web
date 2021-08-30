import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';
import IActivityRequestsRepository from 'modules/managePlayers/repositories/IActivityRequestsRepository';
import makeHttpProvider from 'shared/domain/providers/factories/makeHttpProvider';

export default class ActivityRequestsRepository
  implements IActivityRequestsRepository {
  private httpProvider = makeHttpProvider();

  public async accept(id: string): Promise<void> {
    await this.httpProvider.patch(`requests/activities/${id}/complete`);
  }

  public async delete(id: string): Promise<void> {
    await this.httpProvider.delete(`requests/activities/${id}`);
  }

  public async findAllFromGame(): Promise<IActivityRequest[]> {
    return this.httpProvider.get('requests/activities');
  }
}
