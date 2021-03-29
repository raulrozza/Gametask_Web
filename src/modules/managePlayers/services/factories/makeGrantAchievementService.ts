import makeAchievementRequestsRepository from 'modules/managePlayers/repositories/factories/makeAchievementRequestsRepository';
import GrantAchievementService from 'modules/managePlayers/services/GrantAchievementService';

export default function makeGrantAchievementService(): GrantAchievementService {
  const repository = makeAchievementRequestsRepository();

  return new GrantAchievementService(repository);
}
