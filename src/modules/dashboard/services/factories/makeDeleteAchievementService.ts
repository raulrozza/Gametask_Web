import makeAchievementsRepository from 'modules/dashboard/domain/repositories/factories/makeAchievementsRepository';
import DeleteAchievementService from 'modules/dashboard/services/DeleteAchievementService';

export default function makeDeleteAchievementService(): DeleteAchievementService {
  const achievementsRepository = makeAchievementsRepository();

  const service = new DeleteAchievementService(achievementsRepository);

  return service;
}
