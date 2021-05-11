import TitlesRepository from 'modules/dashboard/infra/repositories/TitlesRepository';
import ITitlesRepository from 'modules/dashboard/repositories/ITitlesRepository';

export default function makeTitlesRepository(): ITitlesRepository {
  const repository = new TitlesRepository();

  return repository;
}
