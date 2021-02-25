import makeGamesRepository from 'modules/user/repositories/factories/makeGamesRepository';
import CreateGameService from '../CreateGameService';

export default function makeCreateGameService(): CreateGameService {
  const gamesRepository = makeGamesRepository();
  const createGame = new CreateGameService(gamesRepository);

  return createGame;
}
