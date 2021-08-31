import ITitlesRepository from 'modules/managePlayers/domain/repositories/ITitlesRepository';
import TitlesRepository from 'modules/managePlayers/infra/repositories/TitlesRepository';

export default function makeTitlesRepository(): ITitlesRepository {
  const repository = new TitlesRepository();

  return repository;
}
