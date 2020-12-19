import { useContext } from 'react';

// Contexts
import { GameContext } from 'contexts';

// Types
import { IGameData } from 'interfaces';

export function useGameData(): IGameData {
  const game = useContext(GameContext);

  return game;
}
