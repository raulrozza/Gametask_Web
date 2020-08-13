import styled, { css } from 'styled-components';

export const PageWrapperContainer = styled.main`
  ${({ theme }) => css`
    background-color: ${theme.primaryLowShade};
    min-height: 100vh;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .container {
      background-color: ${theme.primary};
      padding: 10px;
      border-radius: 10px;
      margin: 10px;
      width: 100%;
      max-width: 1000px;

      .page-nav {
        display: flex;
        color: ${theme.secondaryExtraIntense};
        border-bottom: 1px solid ${theme.primaryShade};

        a {
          background: transparent;
          border: none;
          margin-right: 10px;
          display: flex;
          align-items: center;

          svg {
            font-size: 24px;
            color: ${theme.secondaryExtraIntense};
            cursor: pointer;
            transition: all 0.2s;
          }

          &:hover svg {
            color: ${theme.secondary};
          }
        }
      }
    }

    /* CHILDREN STYLING */

    /* Loading */
    .loader {
      width: 100%;
      height: 80vh;
    }

    /* Full container */
    .row {
      display: flex;

      > div {
        transition: all 0.5s;
      }
    }

    /* Shower */
    > div > div {
      transition: width 0.5s;
      width: 100%;
      margin: 10px 0;
    }

    .reduced {
      width: 60%;
    }

    /* Editor */
    .editor {
      width: 0%;
      border-left: 1px solid transparent;
      min-height: 100%;
      overflow: hidden;

      &.shown {
        width: 40%;
        border-color: ${theme.primaryShade};
        overflow: auto;
      }
    }

    .footer {
      display: flex;
      justify-content: flex-end;

      button {
        cursor: pointer;
        background-color: ${theme.secondary};
        color: ${theme.secondaryContrast};
        border: none;
        border-radius: 2px;
        line-height: 24px;
        font-size: 16px;
        padding: 8px 12px;
        transition: all 0.2s;

        &:hover:not(:disabled) {
          background-color: ${theme.secondaryShade};
        }
      }

      .plus-icon {
        display: none;
      }
    }

    /* Responsiveness */
    @media (max-width: 768px) {
      .row:not(.always-row) {
        flex-direction: column-reverse;
        transition: height 0.3s;
      }

      .reduced {
        width: 100%;
      }

      .editor {
        width: 100%;
        height: 0;
        overflow: hidden;
        border: none;
        transition: height 0.5s;

        &.shown {
          width: 100%;
          height: auto;
          border: none;
          overflow: auto;
          transition: height 0.5s;
        }
      }

      .footer {
        position: absolute;
        top: 30px;
        right: 30px;
      }
    }

    /* Responsiveness */
    @media (max-width: 576px) {
      .footer {
        button span {
          display: none;
        }

        .plus-icon {
          display: inline;
        }
      }
    }
  `}
`;
