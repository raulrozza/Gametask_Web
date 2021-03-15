import makeActivitiesRepository from 'modules/dashboard/repositories/factories/makeActivitiesRepository';
import EditActivityService from 'modules/dashboard/services/EditActivityService';

export default function makeEditActivityService(): EditActivityService {
  const activitiesRepository = makeActivitiesRepository();

  const service = new EditActivityService(activitiesRepository);

  return service;
}
