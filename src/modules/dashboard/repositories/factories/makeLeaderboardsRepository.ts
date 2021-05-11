import LeaderboardsRepository from 'modules/dashboard/infra/repositories/LeaderboardsRepository';
import ILeaderboardsRepository from 'modules/dashboard/repositories/ILeaderboardsRepository';

export default function makeLeaderboardsRepository(): ILeaderboardsRepository {
  const repository = new LeaderboardsRepository();

  return repository;
}
