import { createContext, useContext } from 'react';
import ILevelContext from 'modules/gameManagement/container/contexts/LevelContext/models/ILevelContext';

export const LevelContextProvider = createContext<ILevelContext>(
  {} as ILevelContext,
);

const useLevelContext = (): ILevelContext => {
  const levelProvider = useContext(LevelContextProvider);

  if (!levelProvider)
    throw new Error(
      'useLevelContext should be called inside a LevelContextProvider',
    );

  return levelProvider;
};

export default useLevelContext;
