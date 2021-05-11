import makeAchievementsRepository from 'modules/dashboard/repositories/factories/makeAchievementsRepository';
import ListAchievementsService from '../ListAchievementsService';

export default function makeListAchievementsService(): ListAchievementsService {
  const achievementsRepository = makeAchievementsRepository();

  const service = new ListAchievementsService(achievementsRepository);

  return service;
}
