import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    margin: 0 auto;
    width: 100%;
    max-width: 550px;
    padding: ${theme.layout.spacing(4)};
    text-align: center;

    h2 {
      color: ${theme.palette.secondary.main};
      margin-bottom: ${theme.layout.spacing(3)};
    }

    p {
      margin-bottom: ${theme.layout.spacing(3)};
    }

    footer {
      margin: ${theme.layout.spacing(1, 0)};
    }
  `}
`;
