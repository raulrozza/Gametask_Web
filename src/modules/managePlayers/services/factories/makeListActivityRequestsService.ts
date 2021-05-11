import makeActivityRequestsRepository from 'modules/managePlayers/repositories/factories/makeActivityRequestsRepository';
import ListActivityRequestsService from 'modules/managePlayers/services/ListActivityRequestsService';

export default function makeListActivityRequestsService(): ListActivityRequestsService {
  const repository = makeActivityRequestsRepository();

  return new ListActivityRequestsService(repository);
}
