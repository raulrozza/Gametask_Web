import makeTitlesRepository from 'modules/managePlayers/repositories/factories/makeTitlesRepository';
import GetTitlesService from 'modules/managePlayers/services/GetTitlesService';

export default function makeGetTitlesService(): GetTitlesService {
  const titlesRepository = makeTitlesRepository();

  const service = new GetTitlesService(titlesRepository);

  return service;
}
