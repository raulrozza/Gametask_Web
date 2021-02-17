import styled, { css } from 'styled-components';

export const PlayersContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .back-button {
    position: fixed;
    top: 8px;
    left: 8px;
    font-size: 28px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
  }
`;

export const RequestsContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    width: 480px;

    ul {
      list-style: none;
      max-height: 90vh;
      overflow-y: auto;
      scrollbar-width: thin;

      li + li {
        margin-top: 8px;
      }
    }

    .request {
      display: flex;
      flex-direction: column;
      padding: 4px;

      section {
        display: flex;
        margin-bottom: 4px;
      }

      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .main > div {
        display: flex;
        flex-direction: column;
      }

      .title strong {
        text-transform: capitalize;
      }

      .info {
        font-size: 14px;
        margin-top: 4px;
      }
    }

    @media (max-width: 768px) {
      width: calc(100% - 20px);
    }
  `}
`;

export const RequestFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: ${theme.palette.primary.dark};
      font-size: 14px;
    }

    div {
      display: flex;

      button {
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      button + button {
        margin-left: 4px;
      }
    }

    .details {
      background-color: ${theme.palette.primary.main};
      border: 1px solid ${theme.palette.secondary.light};
      color: ${theme.palette.secondary.light};

      &:hover {
        background-color: ${theme.palette.secondary.light};
        color: ${theme.palette.secondary.contrast};
      }
    }

    .confirm {
      background-color: darkgreen;
      border: 1px solid darkgreen;
      color: white;

      &:hover {
        background-color: green;
        border: 1px solid green;
      }
    }

    .delete {
      background-color: darkred;
      border: 1px solid darkred;
      color: white;

      &:hover {
        background-color: red;
        border: 1px solid red;
      }
    }
  `}
`;

export const NoRequests = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    font-size: 48px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
