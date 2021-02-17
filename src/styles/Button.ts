import styled, { css } from 'styled-components';
import { ButtonProps } from 'styles';

const Button = styled.button<ButtonProps>`
  ${({ theme, outline = false }) => css`
    cursor: pointer;
    ${outline
      ? css`
          background-color: ${theme.palette.primary.main};
          color: ${theme.palette.secondary.main};
          border: 1px solid ${theme.palette.secondary.main};
        `
      : css`
          background-color: ${theme.palette.secondary.main};
          color: ${theme.palette.secondary.contrast};
          border: none;
        `}

    border-radius: 2px;
    line-height: 24px;
    font-size: 16px;
    padding: 8px 12px;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      ${outline
        ? css`
            background-color: ${theme.palette.secondary.main};
            color: ${theme.palette.secondary.contrast};
          `
        : css`
            background-color: ${theme.palette.secondary.dark};
          `}
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `}
`;

export default Button;
