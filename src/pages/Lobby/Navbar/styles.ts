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
      color: ${({ theme }) => theme.secondaryIntense};

      @media (max-width: 383px) {
        display: none;
      }
      span {
        font-family: inherit;
        color: ${({ theme }) => theme.primaryContrast};

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
      color: ${({ theme }) => theme.secondaryExtraIntense};
    }

    span.logout {
      color: ${({ theme }) => theme.secondary};
      cursor: pointer;

      transition: color 0.2s;

      &:hover {
        text-decoration: underline;
        color: ${({ theme }) => theme.secondaryLowShade};
      }
    }
  }
`;
