import TitlesRepository from 'modules/managePlayers/infra/repositories/TitlesRepository';
import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';

export default function makeTitlesRepository(): ITitlesRepository {
  const repository = new TitlesRepository();

  return repository;
}
