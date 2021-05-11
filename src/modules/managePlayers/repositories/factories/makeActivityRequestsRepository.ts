import ActivityRequestsRepository from 'modules/managePlayers/infra/repositories/ActivityRequestsRepository';
import IActivityRequestsRepository from 'modules/managePlayers/repositories/IActivityRequestsRepository';

export default function makeActivityRequestsRepository(): IActivityRequestsRepository {
  return new ActivityRequestsRepository();
}
