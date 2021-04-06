import { getContrastColor } from 'modules/dashboard/view/helpers';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

interface ColorProps {
  primary: string;
  secondary: string;
}

export const Container = styled.div<ColorProps>`
  ${({ theme, primary, secondary }) => css`
    width: 200px;

    padding: ${theme.layout.spacing(2)};

    border: 1px solid ${darken(0.1, secondary)};

    background-color: ${primary};

    color: ${getContrastColor(primary)};

    h3 {
      color: ${secondary};
    }
  `}
`;

export const LightText = styled.p<ColorProps>`
  ${({ secondary }) => css`
    font-size: 14px;
    font-style: italic;

    color: ${lighten(0.1, secondary)};
  `}
`;

const generalButtonStyle = css`
  cursor: pointer;

  border-radius: ${({ theme }) => theme.layout.borderRadius.small};
  padding: ${({ theme }) => theme.layout.spacing(2, 3)};
  transition: all 0.2s;
`;

export const NormalButton = styled.button<ColorProps>`
  ${({ theme, secondary }) => css`
    ${generalButtonStyle}

    background-color: ${secondary};
    color: ${getContrastColor(secondary)};
    border: none;

    &:hover {
      background-color: ${lighten(0.1, secondary)};
    }

    margin: ${theme.layout.spacing(1, 0)};
  `}
`;

export const OutlinedButton = styled.button<ColorProps>`
  ${({ primary, secondary }) => css`
    ${generalButtonStyle}

    background-color: ${primary};
    color: ${secondary};
    border: 1px solid ${secondary};

    &:hover {
      background-color: ${secondary};
      color: ${getContrastColor(secondary)};
    }
  `}
`;
