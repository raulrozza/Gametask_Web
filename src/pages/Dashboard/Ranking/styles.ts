import styled, { css } from 'styled-components';
import { InfoBox } from '../styles';

export const RankingContainer = styled(InfoBox)`
  ${({ theme }) => css`
    width: 100%;
    max-width: 330px;

    ul {
      list-style: none;

      li {
        margin-bottom: 5px;
        display: flex;
        height: 30px;

        div {
          &.points {
            width: 30%;
          }

          &.user {
            width: 65%;
          }

          &:not(.list-title) {
            justify-content: center;
            font-family: Verdana, Geneva, Tahoma, sans-serif;

            .name {
              font-size: 14px;
            }
          }

          &.registers-box {
            background-color: ${theme.secondaryShade};
            color: ${theme.secondaryContrast};
            padding: 4px;
            border-radius: 4px;
            height: 20px;
          }
        }

        &.list-title {
          font-weight: bold;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${theme.primaryLowShade};
          font-family: 'Open Sans', sans-serif;

          ul li div {
            height: 100%;
            display: flex;
            align-items: center;
          }
        }
      }

      > span {
        display: flex;
        height: 60px;
        align-items: center;
        font-size: 14px;
        justify-content: center;
        text-decoration: underline;
        color: ${theme.secondary};

        svg {
          margin-left: 4px;
        }
      }

      .rank {
        font-weight: bold;
        padding: 4px;
        margin-right: 4px;
        border-radius: 4px;
        font-size: 12px;
        text-transform: uppercase;
        cursor: default;
        font-family: Open-Sans, Roboto, sans-serif;
      }
    }

    footer {
      border-top: 1px solid ${theme.primaryLowShade};
      margin-top: 8px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;
      font-size: 14px;
    }
  `}
`;
