import ICreateActivityDTO from 'modules/dashboard/domain/dtos/ICreateActivityDTO';
import IEditActivityDTO from 'modules/dashboard/domain/dtos/IEditActivityDTO';
import IActivity from 'modules/dashboard/domain/entities/IActivity';
import IActivitiesRepository from 'modules/dashboard/domain/repositories/IActivitiesRepository';
import makeHttpProvider from 'shared/domain/providers/factories/makeHttpProvider';

export default class ActivitiesRepository implements IActivitiesRepository {
  private httpProvider = makeHttpProvider();

  public async create({
    name,
    experience,
    dmRules,
    description,
  }: ICreateActivityDTO): Promise<IActivity> {
    const payload: ICreateActivityDTO = { name, experience };
    if (dmRules) payload.dmRules = dmRules;
    if (description) payload.description = description;

    const response = await this.httpProvider.post<IActivity>(
      'activities',
      payload,
    );

    return response;
  }

  public async edit({
    id,
    name,
    description,
    experience,
    dmRules,
  }: IEditActivityDTO): Promise<IActivity> {
    const payload: Omit<IEditActivityDTO, 'id'> = { name, experience };
    if (dmRules) payload.dmRules = dmRules;
    if (description) payload.description = description;

    const response = await this.httpProvider.put<IActivity>(
      `activities/${id}`,
      payload,
    );

    return response;
  }

  public async delete(id: string): Promise<void> {
    return this.httpProvider.delete(`activities/${id}`);
  }

  public async findAll(): Promise<IActivity[]> {
    const response = await this.httpProvider.get<IActivity[]>('activities');

    return response;
  }
}
