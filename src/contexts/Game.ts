import { createContext } from 'react';

// Types
import { IGameData } from 'interfaces';

const Game = createContext<IGameData>({
  game: null,
  loading: true,
  switchGame: () => null,
  refreshGame: async () => undefined,
});

export default Game;
