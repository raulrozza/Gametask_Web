import makeAchievementRequestsRepository from 'modules/managePlayers/repositories/factories/makeAchievementRequestsRepository';
import GrantAchievementRequestService from 'modules/managePlayers/services/GrantAchievementRequestService';

export default function makeGrantAchievementRequestService(): GrantAchievementRequestService {
  const repository = makeAchievementRequestsRepository();

  return new GrantAchievementRequestService(repository);
}
