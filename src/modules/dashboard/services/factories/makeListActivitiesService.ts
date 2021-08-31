import makeActivitiesRepository from 'modules/dashboard/domain/repositories/factories/makeActivitiesRepository';
import ListActivitiesService from 'modules/dashboard/services/ListActivitiesService';

export default function makeListActivitiesService(): ListActivitiesService {
  const activitiesRepository = makeActivitiesRepository();

  const service = new ListActivitiesService(activitiesRepository);

  return service;
}
