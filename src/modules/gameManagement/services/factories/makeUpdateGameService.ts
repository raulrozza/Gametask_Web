import makeGamesRepository from 'modules/gameManagement/domain/repositories/factories/makeGamesRepository';
import UpdateGameService from 'modules/gameManagement/services/UpdateGameService';

export default function makeUpdateGameService(): UpdateGameService {
  const repository = makeGamesRepository();

  return new UpdateGameService(repository);
}
