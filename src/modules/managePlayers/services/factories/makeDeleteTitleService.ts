import makeTitlesRepository from 'modules/managePlayers/domain/repositories/factories/makeTitlesRepository';
import DeleteTitleService from 'modules/managePlayers/services/DeleteTitleService';

export default function makeDeleteTitleService(): DeleteTitleService {
  const repository = makeTitlesRepository();

  return new DeleteTitleService(repository);
}
