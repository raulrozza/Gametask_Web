import IGamesRepository from 'modules/gameManagement/domain/repositories/IGamesRepository';
import GamesRepository from 'modules/gameManagement/infra/repositories/GamesRepository';

export default function makeGamesRepository(): IGamesRepository {
  return new GamesRepository();
}
