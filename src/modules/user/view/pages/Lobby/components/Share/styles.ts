import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: ${theme.layout.spacing(4)};

    span {
      align-self: flex-start;
      font-weight: bold;

      margin-bottom: ${theme.layout.spacing(2)};
    }
  `}
`;

export const InputGroup = styled.div`
  ${({ theme }) => css`
    height: 36px;
    width: 100%;
    max-width: 300px;

    display: flex;
    align-items: stretch;
    overflow: hidden;

    border: 1px solid ${theme.palette.secondary.main};
    border-radius: ${theme.layout.borderRadius.small};
  `}
`;

export const QRContainer = styled.div`
  ${({ theme }) => css`
    margin: ${theme.layout.spacing(2)};
  `}
`;

export const CipherInput = styled.input`
  ${({ theme }) => css`
    flex: 1;
    border: none;

    padding: ${theme.layout.spacing(0, 2)};

    background-color: ${theme.palette.primary.dark};
    color: ${theme.palette.primary.contrast};
  `}
`;

export const CopyButton = styled.button`
  ${({ theme }) => css`
    width: 36px;
    font-size: 18px;

    border: none;
    outline: none;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrast};

    cursor: pointer;

    transition: all 0.3s;

    &:hover {
      color: ${theme.palette.secondary.main};
    }

    &:active,
    &:focus {
      outline: 1px solid ${transparentize(0.4, theme.palette.secondary.main)};
      color: ${theme.palette.secondary.light};
    }
  `}
`;
