import makeLeaderboardsRepository from 'modules/dashboard/domain/repositories/factories/makeLeaderboardsRepository';
import ResetLeaderboardsService from 'modules/dashboard/services/ResetLeaderboardsService';

export default function makeResetLeaderboardsService(): ResetLeaderboardsService {
  const repository = makeLeaderboardsRepository();

  return new ResetLeaderboardsService(repository);
}
