import ILeaderboardsRepository from 'modules/dashboard/domain/repositories/ILeaderboardsRepository';
import LeaderboardsRepository from 'modules/dashboard/infra/repositories/LeaderboardsRepository';

export default function makeLeaderboardsRepository(): ILeaderboardsRepository {
  const repository = new LeaderboardsRepository();

  return repository;
}
