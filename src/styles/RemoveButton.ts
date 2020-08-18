import styled, { css } from 'styled-components';
import { RemoveButtonProps } from './types';

export const RemoveButton = styled.button<RemoveButtonProps>`
  ${({ theme, horizontalPosition = 'left' }) => css`
    position: absolute;
    top: 2px;
    ${horizontalPosition}: 2px;
    width: 18px;
    height: 18px;

    border: none;
    border-radius: 50%;
    color: ${theme.primary};
    background-color: darkred;
    transition: background-color 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:hover {
      background-color: rgb(180, 31, 31);
    }
  `}
`;
