import makeGamesRepository from 'modules/user/providers/factories/makeGamesRepository';
import ListAllGamesService from '../ListAllGamesService';

export default function makeListAllGamesService(): ListAllGamesService {
  const gamesRepository = makeGamesRepository();
  const listAllGames = new ListAllGamesService(gamesRepository);

  return listAllGames;
}
