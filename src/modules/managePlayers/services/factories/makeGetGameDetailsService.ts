import makeGamesRepository from 'shared/repositories/factories/makeGamesRepository';
import GetGameDetailsService from '../GetGameDetailsService';

export default function makeGetGameDetailsService(): GetGameDetailsService {
  const gamesRepository = makeGamesRepository();

  const getGameDetails = new GetGameDetailsService(gamesRepository);

  return getGameDetails;
}
