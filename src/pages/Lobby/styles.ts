import styled, { css } from 'styled-components';
import { GameCardProps } from './types';

export const Container = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.primaryLowShade};
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    section.games-container {
      height: calc(100% - 32px);
      width: 100%;
      padding: 0 8px 0 32px;

      overflow-x: auto;
      scrollbar-width: thin;

      display: flex;
      align-items: center;

      & > div {
        height: 320px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        & > div + div {
          margin-left: 16px;
        }
      }
    }
  `}
`;

export const GameCard = styled.div<GameCardProps>`
  width: 280px;
  height: 100%;
  display: flex;

  background: transparent;

  border-radius: 16px;

  ${({ theme, hasInfo }) =>
    hasInfo
      ? css``
      : css`
          border: 1px dashed ${theme.primaryContrast};

          transition: background-color 0.2s;

          &:hover {
            background: ${theme.secondaryTransparent};
          }

          button {
            background-color: transparent;
            width: 100%;
            border: none;
            cursor: pointer;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            font-size: 32px;

            span {
              margin-top: 8px;
              font-size: 20px;
            }
          }
        `}
`;
