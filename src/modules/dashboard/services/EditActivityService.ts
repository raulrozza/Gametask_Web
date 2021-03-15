import IEditActivityDTO from 'modules/dashboard/dtos/IEditActivityDTO';
import IActivity from 'modules/dashboard/entities/IActivity';
import IActivitiesRepository from 'modules/dashboard/repositories/IActivitiesRepository';

interface IExecute {
  activity?: IActivity;
  error?: string;
  shouldLogout?: boolean;
}

export default class EditActivityService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  public async execute(data: IEditActivityDTO): Promise<IExecute> {
    try {
      const activity = await this.activitiesRepository.edit(data);

      return { activity };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
