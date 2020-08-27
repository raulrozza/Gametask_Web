import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 16px;

    span {
      align-self: flex-start;
      font-weight: bold;
    }

    .input-group {
      height: 36px;
      width: 100%;
      max-width: 300px;

      display: flex;
      align-items: stretch;
      overflow: hidden;

      border: 1px solid ${theme.secondary};
      border-radius: 4px;

      input {
        flex: 1;
        border: none;

        padding: 0 8px;

        background-color: ${theme.primaryLowShade};
        color: ${theme.primaryContrast};
      }

      button {
        width: 36px;
        font-size: 18px;

        border: none;
        outline: none;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: ${theme.primary};
        color: ${theme.primaryExtraShade};

        cursor: pointer;

        transition: all 0.3s;

        &:hover {
          color: ${theme.secondary};
        }

        &:active,
        &:focus {
          outline: 1px solid ${theme.secondaryTransparent};
          color: ${theme.secondaryIntense};
        }
      }
    }
  `}
`;
