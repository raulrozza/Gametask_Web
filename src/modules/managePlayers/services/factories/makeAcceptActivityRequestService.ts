import makeActivityRequestsRepository from 'modules/managePlayers/domain/repositories/factories/makeActivityRequestsRepository';
import AcceptActivityRequestService from 'modules/managePlayers/services/AcceptActivityRequestService';

export default function makeAcceptActivityRequestService(): AcceptActivityRequestService {
  const repository = makeActivityRequestsRepository();

  return new AcceptActivityRequestService(repository);
}
