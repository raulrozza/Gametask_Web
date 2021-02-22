export default interface ISessionProvider {
  userToken: string | null;
  selectedGame: string | null;
  loading: boolean;

  login(token: string): Promise<void>;
  logout(): Promise<void>;

  switchGame(gameId?: string): Promise<void>;
}
