import styled, { css } from 'styled-components';

export const Main = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.dark};
    min-height: 100vh;
    padding: ${theme.layout.spacing(2)};
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .column {
      display: flex;
      flex-direction: column;
    }

    @media (max-width: ${theme.layout.breakpoints.md}) {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
  `}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
