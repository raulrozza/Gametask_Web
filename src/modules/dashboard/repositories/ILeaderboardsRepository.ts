import ILeaderboard from 'shared/entities/ILeaderboard';

export default interface ILeaderboardsRepository {
  findCurrent(): Promise<ILeaderboard | null>;
  reset(): Promise<void>;
}
