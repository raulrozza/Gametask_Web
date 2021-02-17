import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  div {
    display: flex;
    align-items: center;

    img {
      height: 48px;
      margin: 4px;
    }

    h2 {
      color: ${({ theme }) => theme.palette.secondary.light};

      @media (max-width: 383px) {
        display: none;
      }
      span {
        font-family: inherit;
        color: ${({ theme }) => theme.palette.primary.contrast};

        @media (max-width: 576px) {
          display: none;
        }
      }
    }
  }

  span {
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    text-align: right;

    @media (max-width: 383px) {
      font-size: 12px;
    }

    strong {
      color: ${({ theme }) => theme.palette.secondary.light};
    }

    span.logout {
      color: ${({ theme }) => theme.palette.secondary.main};
      cursor: pointer;

      transition: color 0.2s;

      &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.palette.secondary.dark};
      }
    }
  }
`;
