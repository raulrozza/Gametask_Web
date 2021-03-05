import makeTitlesRepository from 'modules/dashboard/repositories/factories/makeTitlesRepository';
import GetGameTitlesService from 'modules/dashboard/services/GetGameTitlesService';

export default function makeGetGamesTitlesService(): GetGameTitlesService {
  const titlesRepository = makeTitlesRepository();

  const service = new GetGameTitlesService(titlesRepository);

  return service;
}
