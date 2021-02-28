import GamesRepository from 'shared/infra/repositories/GamesRepository';
import IGamesRepository from 'shared/repositories/IGamesRepository';

export default function makeGamesRepository(): IGamesRepository {
  const gamesRepository = new GamesRepository();

  return gamesRepository;
}
