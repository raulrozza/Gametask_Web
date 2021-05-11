import { darken } from 'polished';
import styled, { css } from 'styled-components';
import { Box } from '..';

export const Container = styled(Box)`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: center;

    div {
      margin: ${theme.layout.spacing(2, 0)};
    }

    .name {
      font-weight: bolder;
      font-size: 24px;
    }
  `}
`;

export const ImageContainer = styled.div`
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const InteractableOptions = styled.button`
  ${({ theme }) => css`
    width: 280px;
    background-color: ${darken(0.1, theme.palette.primary.main)};
    border: 1px solid ${darken(0.15, theme.palette.primary.main)};
    border-top: none;
    padding: ${({ theme }) => theme.layout.spacing(2, 0)};
    cursor: pointer;

    color: ${theme.palette.secondary.main};

    &:hover {
      text-decoration: underline;
    }

    & + button {
      border-bottom: none;
    }
  `}
`;

export const ConfigButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.layout.spacing(1)};
    right: ${theme.layout.spacing(1)};
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    transition: color 0.4s;

    &:hover {
      color: ${darken(0.05, theme.palette.primary.main)};
    }
  `}
`;

export const LoggedInfoText = styled.div`
  font-size: 14px;

  strong {
    color: ${({ theme }) => theme.palette.secondary.light};
  }
`;
