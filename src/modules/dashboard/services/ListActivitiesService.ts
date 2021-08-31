import IActivitiesRepository from 'modules/dashboard/repositories/IActivitiesRepository';
import IActivity from 'modules/dashboard/domain/entities/IActivity';

interface IExecute {
  activities?: IActivity[];
  error?: string;
  shouldLogout?: boolean;
}

export default class ListActivitiesService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      const activities = await this.activitiesRepository.findAll();

      return { activities };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
