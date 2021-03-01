import React from 'react';
import useThemeContext from 'shared/container/contexts/ThemeContext/contexts/useThemeContext';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { Container } from './styles';

const NUMBER_OF_SKELETONS = 9;
const SKELETONS_ITERATOR = Array.from(Array(NUMBER_OF_SKELETONS).keys());

const AchievementSkeletons: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <>
      {SKELETONS_ITERATOR.map(index => (
        <Container key={`achievement-skeleton-${index}`}>
          <div className="image">
            <SkeletonLoader
              background={theme.palette.primary.dark}
              height="80px"
              circle
            />
          </div>

          <div className="name">
            <SkeletonLoader
              background={theme.palette.primary.dark}
              height="100%"
            />
          </div>
        </Container>
      ))}
    </>
  );
};

export default AchievementSkeletons;
