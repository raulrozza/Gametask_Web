import IAchievementRequestsRepository from 'modules/managePlayers/domain/repositories/IAchievementRequestsRepository';
import AchievementRequestsRepository from 'modules/managePlayers/infra/repositories/AchievementRequestsRepository';

export default function makeAchievementRequestsRepository(): IAchievementRequestsRepository {
  return new AchievementRequestsRepository();
}
