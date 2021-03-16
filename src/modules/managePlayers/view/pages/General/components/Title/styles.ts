import styled, { css } from 'styled-components';
import { TitleElementContainerProps } from './types';

export const Container = styled.li<TitleElementContainerProps>`
  ${({ theme, editing }) => css`
    display: grid;
    padding: 4px;
    height: 40px;
    gap: 0;
    grid-template-columns: 1fr 32px;

    position: relative;

    input {
      padding: 4px;

      ${editing
        ? css`
            border: 1px solid ${theme.palette.primary.contrast};
            border-right: none;

            background-color: ${theme.palette.primary.light};
            color: ${theme.palette.primary.contrast};
          `
        : css`
            cursor: pointer;
            border: 1px solid transparent;
            background-color: transparent;

            color: ${theme.palette.secondary.main};

            transition: border-color 0.2s;

            &:hover {
              border-bottom: 1px solid ${theme.palette.secondary.main};
            }
          `}
    }

    button {
      background-color: darkred;
      border: 1px solid darkred;
      color: white;
      cursor: pointer;

      position: absolute;
      right: 0;
      top: 4px;
      bottom: 4px;

      width: 32px;

      ${!editing &&
      css`
        display: none;
      `}

      &:hover {
        background-color: red;
        border: 1px solid red;
      }
    }
  `}
`;
