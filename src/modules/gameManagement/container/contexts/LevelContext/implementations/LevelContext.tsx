import React, { useCallback, useState } from 'react';
import { LevelContextProvider } from 'modules/gameManagement/container/contexts/LevelContext/contexts/useLevelContext';
import ILevelInfo from 'shared/entities/ILevelInfo';
import { addItemToArray } from 'utils';

interface LevelContextProps {
  initialLevels: ILevelInfo[];
}

const LevelContext: React.FC<LevelContextProps> = ({
  initialLevels,
  children,
}) => {
  const [levels, setLevels] = useState<ILevelInfo[]>(initialLevels);

  const addLevel = useCallback(
    () =>
      setLevels(levels => {
        const maxLevel = levels.length ? levels[levels.length - 1].level : 1;

        const newLevel = {
          requiredExperience: 0,
          title: '',
          level: maxLevel,
        };

        return addItemToArray(levels, newLevel);
      }),
    [],
  );

  return (
    <LevelContextProvider.Provider
      value={{
        levels,
        addLevel,
      }}
    >
      {children}
    </LevelContextProvider.Provider>
  );
};

export default LevelContext;
