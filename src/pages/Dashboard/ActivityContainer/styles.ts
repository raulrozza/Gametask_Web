import styled, { css } from 'styled-components';
import { MinMaxBox } from '../styles';

export const ActivityBox = styled(MinMaxBox)`
  ${({ theme }) => css`
    .activity-container {
      max-height: 198px; /* 89px for each row, plus 10px for each row's margin */
      grid-template-columns: repeat(3, 1fr);

      .activity {
        padding: 5px;
        font-weight: bold;
        text-align: center;
        border: 1px solid ${theme.secondaryShade};
        border-radius: 10px;
        margin: 5px;

        &.no-border {
          border: none;
        }
      }

      .activity-name {
        font-size: 16px;
        text-transform: uppercase;
        height: 40px;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .activity-experience {
        color: ${theme.secondary};
        font-size: 20px;
        height: 32px;
      }

      /* Responsiveness */
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      /* Responsiveness */
      @media (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  `}
`;
