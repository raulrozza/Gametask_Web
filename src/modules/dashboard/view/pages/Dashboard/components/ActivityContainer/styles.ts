import styled from 'styled-components';

import ExpandableBox from '../ExpandableBox';

export const ActivitiesWrapper = styled(ExpandableBox.Container)`
  max-height: 198px; /* 89px for each row, plus 10px for each row's margin */
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-evenly;
  justify-items: stretch;
  gap: ${({ theme }) => theme.layout.spacing(1)};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
