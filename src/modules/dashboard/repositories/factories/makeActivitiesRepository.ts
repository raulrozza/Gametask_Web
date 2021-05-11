import ActivitiesRepository from 'modules/dashboard/infra/repositories/ActivitiesRepository';
import IActivitiesRepository from 'modules/dashboard/repositories/IActivitiesRepository';

export default function makeActivitiesRepository(): IActivitiesRepository {
  const repository = new ActivitiesRepository();

  return repository;
}
