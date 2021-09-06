import makeLeaderboardsRepository from 'modules/dashboard/domain/repositories/factories/makeLeaderboardsRepository';
import GetCurrentLeaderboard from 'modules/dashboard/services/GetCurrentLeaderboard';

export default function makeGetCurrentLeaderboard(): GetCurrentLeaderboard {
  const leaderboardsRepository = makeLeaderboardsRepository();

  const service = new GetCurrentLeaderboard(leaderboardsRepository);

  return service;
}
