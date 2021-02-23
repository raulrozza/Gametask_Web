import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.layout.spacing(0, 4)};

  span {
    font-size: 14px;
    font-family: ${({ theme }) => theme.typography.family.title};
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 48px;
    margin: ${({ theme }) => theme.layout.spacing(1)};
  }
`;

export const LobbyTitle = styled.h2`
  color: ${({ theme }) => theme.palette.secondary.light};

  span {
    font-family: inherit;
    color: ${({ theme }) => theme.palette.primary.contrast};
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.sm}) {
    display: none;
  }
`;

export const LoggedText = styled.span`
  text-align: right;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.sm}) {
    font-size: 12px;
  }

  strong {
    color: ${({ theme }) => theme.palette.secondary.main};
  }

  span {
    color: ${({ theme }) => theme.palette.secondary.main};
    cursor: pointer;

    transition: color 0.2s;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.palette.secondary.dark};
    }
  }
`;
