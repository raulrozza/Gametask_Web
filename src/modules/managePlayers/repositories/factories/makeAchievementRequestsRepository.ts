import AchievementRequestsRepository from 'modules/managePlayers/infra/repositories/AchievementRequestsRepository';
import IAchievementRequestsRepository from 'modules/managePlayers/repositories/IAchievementRequestsRepository';

export default function makeAchievementRequestsRepository(): IAchievementRequestsRepository {
  return new AchievementRequestsRepository();
}
