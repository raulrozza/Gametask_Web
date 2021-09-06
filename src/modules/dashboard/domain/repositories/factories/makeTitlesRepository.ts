import ITitlesRepository from 'modules/dashboard/domain/repositories/ITitlesRepository';
import TitlesRepository from 'modules/dashboard/infra/repositories/TitlesRepository';

export default function makeTitlesRepository(): ITitlesRepository {
  const repository = new TitlesRepository();

  return repository;
}
