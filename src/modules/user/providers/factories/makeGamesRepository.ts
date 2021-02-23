import GamesRepository from 'modules/user/infra/repositories/GamesRepository';
import IGamesRepository from 'modules/user/repositories/IGamesRepository';

export default function makeGamesRepository(): IGamesRepository {
  const gamesRepository = new GamesRepository();

  return gamesRepository;
}
