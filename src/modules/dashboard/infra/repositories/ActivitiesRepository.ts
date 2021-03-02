import IActivity from 'modules/dashboard/entities/IActivity';
import IActivitiesRepository from 'modules/dashboard/repositories/IActivitiesRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class ActivitiesRepository implements IActivitiesRepository {
  private httpProvider = makeHttpProvider();

  public async findAll(): Promise<IActivity[]> {
    const response = await this.httpProvider.get<IActivity[]>('activities');

    return response;
  }
}
