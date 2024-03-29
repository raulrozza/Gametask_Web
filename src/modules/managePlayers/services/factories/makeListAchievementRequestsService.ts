import makeAchievementRequestsRepository from 'modules/managePlayers/domain/repositories/factories/makeAchievementRequestsRepository';
import ListAchievementRequestsService from 'modules/managePlayers/services/ListAchievementRequestsService';

export default function makeListActivityRequestsService(): ListAchievementRequestsService {
  const repository = makeAchievementRequestsRepository();

  return new ListAchievementRequestsService(repository);
}
