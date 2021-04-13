import styled, { css } from 'styled-components';

export const Container = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};

    padding: ${theme.layout.spacing(2)};
    margin: ${theme.layout.spacing(2, 'auto')};

    border-radius: ${theme.layout.borderRadius.medium};

    width: calc(100% - ${theme.layout.spacing(4)});
    max-width: ${theme.layout.breakpoints.lg};

    overflow: auto;

    @media (max-width: ${theme.layout.breakpoints.lg}) {
      margin: ${theme.layout.spacing(2)};
    }

    @media (max-width: ${theme.layout.breakpoints.sm}) {
      margin: ${theme.layout.spacing(0)};
      width: 100%;
      height: 100%;
      border-radius: 0px;
    }
  `}
`;

export const Content = styled.div`
  width: 100%;
  min-height: 50vh;

  display: flex;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    flex-direction: column-reverse;

    min-height: 0vh;
  }
`;

export const EmptyContent = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.layout.spacing(2, 0)};
`;
