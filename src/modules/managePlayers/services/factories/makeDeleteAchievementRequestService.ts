import makeAchievementRequestsRepository from 'modules/managePlayers/domain/repositories/factories/makeAchievementRequestsRepository';
import DeleteAchievementRequestService from 'modules/managePlayers/services/DeleteAchievementRequestService';

export default function makeDeleteAchievementRequestService(): DeleteAchievementRequestService {
  const repository = makeAchievementRequestsRepository();

  return new DeleteAchievementRequestService(repository);
}
