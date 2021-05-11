import makeActivityRequestsRepository from 'modules/managePlayers/repositories/factories/makeActivityRequestsRepository';
import DeleteActivityRequestService from 'modules/managePlayers/services/DeleteActivityRequestService';

export default function makeDeleteActivityRequestService(): DeleteActivityRequestService {
  const repository = makeActivityRequestsRepository();

  return new DeleteActivityRequestService(repository);
}
