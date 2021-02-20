export default interface ISessionProvider {
  loggedUser: string | null;
  selectedGame: string | null;
  loading: boolean;

  login(userId: string): Promise<void>;
  logout(): Promise<void>;

  switchGame(gameId?: string): Promise<void>;
}
