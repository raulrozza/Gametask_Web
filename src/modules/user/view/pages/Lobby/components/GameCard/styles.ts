import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    width: 280px;
    height: 100%;
    display: flex;

    background: transparent;

    overflow-y: auto;
    scrollbar-width: thin;

    border-radius: ${theme.layout.borderRadius.medium};

    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.layout.spacing(4, 2)};
    text-align: center;

    background-color: ${transparentize(0.3, theme.palette.primary.main)};
    border: 1px solid ${theme.palette.secondary.main};

    &:hover {
      background-color: ${theme.palette.primary.main};
    }

    strong {
      font-family: ${theme.typography.family.title};
      font-size: 22px;
      color: ${theme.palette.secondary.main};
    }

    img {
      height: 72px;
      width: 72px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
    }

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  `}
`;
