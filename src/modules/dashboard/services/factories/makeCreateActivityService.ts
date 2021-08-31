import makeActivitiesRepository from 'modules/dashboard/domain/repositories/factories/makeActivitiesRepository';
import CreateActivityService from 'modules/dashboard/services/CreateActivityService';

export default function makeCreateActivityService(): CreateActivityService {
  const activitiesRepository = makeActivitiesRepository();

  const service = new CreateActivityService(activitiesRepository);

  return service;
}
