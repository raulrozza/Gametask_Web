import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.button`
  ${({ theme }) => css`
    position: absolute;

    bottom: ${theme.layout.spacing(1)};
    right: ${theme.layout.spacing(1)};

    padding: ${theme.layout.spacing(2)};

    color: ${theme.palette.gray[300]};
    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 22px;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    transition: all 0.2s;

    &:hover {
      color: ${theme.palette.gray[400]};
      background-color: ${transparentize(0.6, theme.palette.gray[100])};
      box-shadow: 0px 0px 5px 2px
        ${transparentize(0.6, theme.palette.gray[400])};
    }

    & svg {
      margin-right: -4px;
    }
  `}
`;
