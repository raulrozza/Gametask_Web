import styled, { css } from 'styled-components';
import { ButtonProps } from 'styles';

const Button = styled.button<ButtonProps>`
  ${({ theme, outline = false }) => css`
    cursor: pointer;
    ${outline
      ? css`
          background-color: ${theme.primary};
          color: ${theme.secondary};
          border: 1px solid ${theme.secondary};
        `
      : css`
          background-color: ${theme.secondary};
          color: ${theme.secondaryContrast};
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
            background-color: ${theme.secondary};
            color: ${theme.secondaryContrast};
          `
        : css`
            background-color: ${theme.secondaryShade};
          `}
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `}
`;

export default Button;
