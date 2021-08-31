import IActivitiesRepository from 'modules/dashboard/domain/repositories/IActivitiesRepository';
import ActivitiesRepository from 'modules/dashboard/infra/repositories/ActivitiesRepository';

export default function makeActivitiesRepository(): IActivitiesRepository {
  const repository = new ActivitiesRepository();

  return repository;
}
