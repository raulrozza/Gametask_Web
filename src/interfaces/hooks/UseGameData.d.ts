import { IGame } from 'interfaces';

export interface IGameData {
  game: IGame | null;
  loading: boolean;
  switchGame: (game?: IGame) => void;
  refreshGame: () => Promise<void>;
}
