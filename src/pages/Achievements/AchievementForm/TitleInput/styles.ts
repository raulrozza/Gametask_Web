import styled, { css } from 'styled-components';
import { TitleOptionsProps } from '../../types';

export const TitleOptions = styled.div<TitleOptionsProps>`
  ${({ theme, visible }) => css`
    position: absolute;
    z-index: 10;
    width: inherit;
    max-height: 80%;
    background-color: ${theme.primaryLowShade};
    border: 1px solid ${theme.primaryContrast};
    border-top: none;
    border-radius: 0 0 5px 5px;
    font-size: 14px;
    visibility: ${visible ? 'visible' : 'hidden'};

    ul {
      list-style: none;
    }

    li,
    button {
      min-height: 20px;
      padding: 2px 10px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background-color: ${theme.primary};
      }
    }

    button {
      border: none;
      width: 100%;
      height: 100%;
      transition: background-color 0.2s;
    }
  `}
`;
