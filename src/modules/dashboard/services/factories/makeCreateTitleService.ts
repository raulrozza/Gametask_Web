import makeTitlesRepository from 'modules/dashboard/repositories/factories/makeTitlesRepository';
import CreateTitleService from 'modules/dashboard/services/CreateTitleService';

export default function makeCreateTitleService(): CreateTitleService {
  const titlesRepository = makeTitlesRepository();

  const service = new CreateTitleService(titlesRepository);

  return service;
}
