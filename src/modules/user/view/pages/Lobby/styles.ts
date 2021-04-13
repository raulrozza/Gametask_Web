import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.dark};
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  `}
`;

export const GamesContainer = styled.section`
  height: 100%;
  width: 100%;
  padding: ${({ theme }) => theme.layout.spacing(0, 2, 0, 8)};

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
      margin-left: ${({ theme }) => theme.layout.spacing(4)};
    }
  }
`;
