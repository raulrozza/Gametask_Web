import ILeaderboard from 'shared/domain/entities/ILeaderboard';

export default interface ILeaderboardsRepository {
  findCurrent(): Promise<ILeaderboard | null>;
  reset(): Promise<void>;
}
