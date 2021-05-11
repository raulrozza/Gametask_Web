import AchievementsRepository from 'modules/dashboard/infra/repositories/AchievementsRepository';
import IAchievementsRepository from 'modules/dashboard/repositories/IAchievementsRepository';

export default function makeAchievementsRepository(): IAchievementsRepository {
  const repository = new AchievementsRepository();

  return repository;
}
