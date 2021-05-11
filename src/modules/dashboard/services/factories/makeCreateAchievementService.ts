import makeAchievementsRepository from 'modules/dashboard/repositories/factories/makeAchievementsRepository';
import CreateAchievementService from 'modules/dashboard/services/CreateAchievementService';

export default function makeCreateAchievementService(): CreateAchievementService {
  const achievementsRepository = makeAchievementsRepository();

  const service = new CreateAchievementService(achievementsRepository);

  return service;
}
