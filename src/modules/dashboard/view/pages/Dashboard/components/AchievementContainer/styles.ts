import styled from 'styled-components';
import ExpandableBox from '../ExpandableBox';

export const AchievementsWrapper = styled(ExpandableBox.Container)`
  max-height: 226px; /* 109px for each row, plus 4px for each row's margin */
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.layout.spacing(1)};

  /* Responsiveness */
  @media (max-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
