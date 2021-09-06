import makeActivitiesRepository from 'modules/dashboard/domain/repositories/factories/makeActivitiesRepository';
import DeleteActivityService from 'modules/dashboard/services/DeleteActivityService';

export default function makeDeleteActivityService(): DeleteActivityService {
  const repository = makeActivitiesRepository();

  const service = new DeleteActivityService(repository);

  return service;
}
