import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  ${({ theme }) => css`
    width: 280px;
    height: 100%;
    display: flex;

    background: transparent;

    overflow-y: auto;
    scrollbar-width: thin;

    border-radius: ${theme.layout.borderRadius.medium};

    border: 1px dashed ${theme.palette.primary.contrast};

    transition: background-color 0.2s;

    &:hover {
      background: ${transparentize(0.4, theme.palette.secondary.main)};
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
        margin-top: ${theme.layout.spacing(2)};
        font-size: 20px;
      }
    }
  `}
`;
