import styled, { css } from 'styled-components';

export const Main = styled.main`
  ${({ theme }) => css`
    min-height: 100vh;
    padding: ${theme.layout.spacing(2)};
    display: flex;
    justify-content: center;
    align-items: flex-start;

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

  max-width: 100vw;
`;
