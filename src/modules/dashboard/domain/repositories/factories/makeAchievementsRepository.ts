import IAchievementsRepository from 'modules/dashboard/domain/repositories/IAchievementsRepository';
import AchievementsRepository from 'modules/dashboard/infra/repositories/AchievementsRepository';

export default function makeAchievementsRepository(): IAchievementsRepository {
  const repository = new AchievementsRepository();

  return repository;
}
