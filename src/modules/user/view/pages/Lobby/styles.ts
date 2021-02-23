import styled, { css } from 'styled-components';
import { IGameCard } from './types';

export const Container = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.dark};
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;

    section.games-container {
      height: calc(100% - 56px);
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

export const GameCard = styled.div<IGameCard>`
  width: 280px;
  height: 100%;
  display: flex;

  background: transparent;

  overflow-y: auto;
  scrollbar-width: thin;

  border-radius: 16px;

  ${({ theme, hasInfo }) =>
    hasInfo
      ? css`
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 16px 8px;
          text-align: center;

          background-color: ${theme.palette.primary.main}55;
          border: 1px solid ${theme.palette.secondary.main};

          strong {
            font-family: 'Open Sans', sans-serif;
            font-size: 22px;
            color: ${theme.palette.secondary.main};
          }

          img {
            height: 72px;
            width: 72px;
            border-radius: 50%;
          }

          div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
          }

          &:hover {
            background-color: ${theme.palette.primary.main};
          }
        `
      : css`
          border: 1px dashed ${theme.palette.primary.contrast};

          transition: background-color 0.2s;

          &:hover {
            background: ${theme.palette.secondary.main}55;
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
