import styled from 'styled-components';
import { MinMaxBox } from '../styles';

export const AchievementBox = styled(MinMaxBox)`
  .achievement-container {
    max-height: 226px; /* 109px for each row, plus 4px for each row's margin */
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;

    .achievement {
      width: 80px;
      padding: 2px;
    }

    .achievement-image {
      width: 80px;
      height: 80px;
      margin-bottom: 5px;
      border-radius: 50%;
    }

    .achievement-name {
      font-size: 12px;
      font-weight: bold;
      line-height: 20px;
      height: 20px;
      width: inherit;
      text-align: center;
    }

    /* Responsiveness */
    @media (max-width: 576px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
