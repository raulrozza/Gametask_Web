import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Row = styled.div`
  display: flex;

  @media (max-width: 576px) {
    position: relative;
  }
`;

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

    @media (max-width: ${theme.layout.breakpoints.sm}) {
      margin: ${theme.layout.spacing(0)};
      width: 100%;
      min-height: 100%;
      border-radius: 0px;
    }
  `}
`;

interface SideNavProps {
  shown: boolean;
}

export const SideNav = styled.aside<SideNavProps>`
  ${({ theme, shown }) => css`
    width: 40%;
    max-width: 196px;

    @media (max-width: ${theme.layout.breakpoints.lg}) {
      width: ${shown ? '20%' : '30px'};
      transition: width 0.3s;
    }

    @media (max-width: ${theme.layout.breakpoints.md}) {
      position: absolute;
      height: 100%;
      z-index: 30;

      ${shown &&
      css`
        background-color: ${theme.palette.primary.main};
        width: 180px;
      `}
    }
  `}
`;

export const MenuButton = styled.button`
  ${({ theme }) => css`
    display: none;

    @media (max-width: ${theme.layout.breakpoints.lg}) {
      display: block;
      cursor: pointer;
      background-color: transparent;
      color: ${theme.palette.secondary.main};
      border: none;
      border-radius: ${theme.layout.borderRadius.small};
      font-size: 18px;
      transition: color 0.2s margin 0.2s;

      margin: ${theme.layout.spacing(0, 1, 0, 1.5)};

      &:hover {
        color: ${theme.palette.primary.contrast};
      }
    }

    @media (max-width: ${theme.layout.breakpoints.md}) {
      margin-top: ${theme.layout.spacing(2)};
    }
  `}
`;

interface TabListProps {
  shown: boolean;
}

export const TabList = styled.div<TabListProps>`
  ${({ theme, shown }) => css`
    padding: ${theme.layout.spacing(2)};

    display: flex;
    flex-direction: column;

    @media (max-width: ${theme.layout.breakpoints.lg}) {
      visibility: ${shown ? 'visible' : 'hidden'};
    }
  `}
`;

interface TabItemProps {
  active: boolean;
}

export const TabItem = styled.button<TabItemProps>`
  ${({ theme, active }) => css`
    padding: ${theme.layout.spacing(2)};
    border-radius: ${theme.layout.borderRadius.small};
    transition: background-color 0.2s;

    margin-bottom: ${theme.layout.spacing(1)};

    border: none;
    cursor: pointer;

    ${active
      ? css`
          background-color: ${theme.palette.secondary.main};
          color: ${theme.palette.secondary.contrast};
        `
      : css`
          background-color: ${darken(0.1, theme.palette.primary.main)};
          color: ${theme.palette.primary.contrast};
        `}

    &:hover {
      background-color: ${active
        ? theme.palette.secondary.dark
        : theme.palette.primary.dark};
    }
  `}
`;

export const Content = styled.main`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.palette.gray['100']};
    border-radius: ${theme.layout.borderRadius.small};

    footer {
      display: flex;
      justify-content: flex-end;
    }
  `}
`;
