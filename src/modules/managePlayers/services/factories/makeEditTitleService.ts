import makeTitlesRepository from 'modules/managePlayers/domain/repositories/factories/makeTitlesRepository';
import EditTitleService from 'modules/managePlayers/services/EditTitleService';

export default function makeEditTitleService(): EditTitleService {
  const repository = makeTitlesRepository();

  return new EditTitleService(repository);
}
