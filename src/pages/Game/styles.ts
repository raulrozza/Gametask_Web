import styled, { css } from 'styled-components';
import { SideNavProps, TabItemProps } from './types';

export const Row = styled.div`
  display: flex;

  @media (max-width: 576px) {
    position: relative;
  }
`;

export const SideNav = styled.aside<SideNavProps>`
  ${({ theme, shown }) => css`
    width: 40%;
    max-width: 196px;

    button {
      display: none;
    }

    ul {
      list-style: none;
      padding: 10px;

      a {
        text-decoration: none;
      }
    }

    @media (max-width: 992px) {
      width: ${shown ? '20%' : '30px'};
      transition: width 0.3s;

      button {
        display: block;
        cursor: pointer;
        margin: 0 10px;
        background-color: transparent;
        color: var(--secondary);
        border: none;
        border-radius: 5px;
        font-size: 18px;
        transition: color 0.2s margin 0.2s;

        margin-left: 4px;
        margin-right: 6px;

        &:hover {
          color: ${theme.primaryContrast};
        }
      }

      ul {
        visibility: ${shown ? 'visible' : 'hidden'};
      }
    }

    @media (max-width: 576px) {
      position: absolute;
      height: 100%;
      z-index: 30;

      button {
        margin-top: 8px;
      }

      ${shown &&
      css`
        background-color: ${theme.primary};
        width: 180px;
      `}
    }
  `}
`;

export const TabItem = styled.li<TabItemProps>`
  ${({ theme, active }) => css`
    padding: 8px 10px;
    border-radius: 5px;
    transition: background-color 0.2s;

    ${active &&
    css`
      background-color: ${theme.secondary};
      color: ${theme.secondaryContrast};
    `}

    &:hover {
      background-color: ${active
        ? theme.secondaryLowShade
        : theme.primaryLowShade};
    }
  `}
`;

export const Content = styled.main`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.primaryLowShade};
    border-radius: 3px;

    footer {
      display: flex;
      justify-content: flex-end;
    }
  `}
`;
