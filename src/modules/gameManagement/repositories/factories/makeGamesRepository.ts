import GamesRepository from 'modules/gameManagement/infra/repositories/GamesRepository';
import IGamesRepository from 'modules/gameManagement/repositories/IGamesRepository';

export default function makeGamesRepository(): IGamesRepository {
  return new GamesRepository();
}
