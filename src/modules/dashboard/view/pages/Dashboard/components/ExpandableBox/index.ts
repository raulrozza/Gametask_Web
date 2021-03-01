import styled, { css } from 'styled-components';
import Box from '../Box';

const ExpandableBox = styled(Box)`
  ${({ theme }) => css`
    .container {
      display: grid;
      overflow-y: hidden;
      transition: all 0.5s;

      &.maximized {
        max-height: 2000px;
      }
    }

    .no-data {
      width: 480px;
      padding: 16px 8px;
      text-align: center;
      font-size: 14px;

      a {
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }

      @media (max-width: 768px) {
        width: 240px;
      }
    }

    .min-max {
      border-top: 1px solid ${theme.palette.primary.dark};
      margin-top: 8px;
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;
      font-size: 14px;

      svg {
        cursor: pointer;
        color: ${theme.palette.primary.dark};
        position: absolute;
        right: 0px;
      }
    }
  `}
`;

export default ExpandableBox;
