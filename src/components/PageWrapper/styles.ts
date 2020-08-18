import styled, { css } from 'styled-components';
import { ReducingDivProps, EditorProps } from './types';

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

    /* Shower */
    > div > div {
      transition: width 0.5s;
      width: 100%;
      margin: 10px 0;
    }
  `}
`;

export const Row = styled.div`
  display: flex;

  > div {
    transition: all 0.5s;
  }

  /* Responsiveness */
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    transition: height 0.3s;
  }
`;

export const ReducingDiv = styled.div<ReducingDivProps>`
  ${({ reduced = false }) =>
    reduced
      ? css`
          width: 60%;
        `
      : css`
          width: 100%;
        `}

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const EmptyContainer = styled(ReducingDiv)`
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.primaryContrast};
`;

export const Editor = styled.div<EditorProps>`
  border-left: 1px solid transparent;
  min-height: 100%;
  ${({ theme, shown }) => css`
    ${shown
      ? css`
          width: 40%;
          border-color: ${theme.primaryShade};
          overflow: auto;
          margin-left: 8px;
        `
      : css`
          width: 0%;
          overflow: hidden;
        `}

    /* Responsiveness */
    @media (max-width: 768px) {
      width: 100%;
      border: none;
      transition: height 0.5s;
      margin-left: 0;

      ${shown
        ? css`
            height: auto;
            overflow: auto;
          `
        : css`
            height: 0;
            overflow: hidden;
          `}
    }
  `}
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
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

    /* Responsiveness */
    @media (max-width: 768px) {
      position: absolute;
      top: 30px;
      right: 30px;
    }

    @media (max-width: 576px) {
      button span {
        display: none;
      }

      .plus-icon {
        display: inline;
      }
    }
  `}
`;

export const Loader = styled.div`
  width: 100%;
  height: 80vh;
`;
