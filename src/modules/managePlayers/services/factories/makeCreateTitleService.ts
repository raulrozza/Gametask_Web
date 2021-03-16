import makeTitlesRepository from 'modules/managePlayers/repositories/factories/makeTitlesRepository';
import CreateTitleService from 'modules/managePlayers/services/CreateTitleService';

export default function makeCreateTitleService(): CreateTitleService {
  const titlesRepository = makeTitlesRepository();

  const service = new CreateTitleService(titlesRepository);

  return service;
}
