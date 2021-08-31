import IActivitiesRepository from 'modules/dashboard/domain/repositories/IActivitiesRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class DeleteActivityService {
  constructor(private activitiesRepository: IActivitiesRepository) {}

  public async execute(id: string): Promise<IExecute> {
    try {
      await this.activitiesRepository.delete(id);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
