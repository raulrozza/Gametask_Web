import makeAchievementsRepository from 'modules/dashboard/repositories/factories/makeAchievementsRepository';
import EditAchievementService from 'modules/dashboard/services/EditAchievementService';

export default function makeEditAchievementService(): EditAchievementService {
  const achievementsRepository = makeAchievementsRepository();

  const service = new EditAchievementService(achievementsRepository);

  return service;
}
