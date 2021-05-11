import React from 'react';
import useThemeContext from 'shared/container/contexts/ThemeContext/contexts/useThemeContext';
import SkeletonLoader from 'tiny-skeleton-loader-react';

import { ListRank, PointsColumn, PlayerNameColumn } from './styles';

const NUMBER_OF_SKELETONS = 3;
const SKELETONS_ITERATOR = Array.from(Array(NUMBER_OF_SKELETONS).keys());

const RankingSkeletons: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <>
      {SKELETONS_ITERATOR.map(index => (
        <ListRank key={`ranking-skeleton-${index}`}>
          <PointsColumn>
            <SkeletonLoader
              background={theme.palette.primary.dark}
              height="100%"
            />
          </PointsColumn>

          <PlayerNameColumn>
            <SkeletonLoader
              background={theme.palette.primary.dark}
              height="100%"
            />
          </PlayerNameColumn>
        </ListRank>
      ))}
    </>
  );
};

export default RankingSkeletons;
