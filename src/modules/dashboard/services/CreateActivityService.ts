import ICreateActivityDTO from 'modules/dashboard/domain/dtos/ICreateActivityDTO';
import IActivity from 'modules/dashboard/domain/entities/IActivity';
import IActivitiesRepository from 'modules/dashboard/domain/repositories/IActivitiesRepository';

interface IExecute {
  activity?: IActivity;
  error?: string;
  shouldLogout?: boolean;
}

export default class CreateActivityService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  public async execute(data: ICreateActivityDTO): Promise<IExecute> {
    try {
      const activity = await this.activitiesRepository.create(data);

      return { activity };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
