import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};

    padding: ${theme.layout.spacing(2)};
    margin: ${theme.layout.spacing(2, 'auto')};

    border-radius: ${theme.layout.borderRadius.medium};

    width: calc(100% - ${theme.layout.spacing(4)});
    max-width: ${theme.layout.breakpoints.lg};

    @media (max-width: ${theme.layout.breakpoints.lg}) {
      margin: ${theme.layout.spacing(2)};
    }
  `}
`;

export const Content = styled.div`
  flex: 1;
  min-height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`;
