import styled, { css } from 'styled-components';
import { ColorInput as ColorInputDefault } from 'modules/gameManagement/view/components';
import { getContrastColor } from 'modules/gameManagement/view/pages/RankConfig/helpers';
import { Input } from 'shared/view/components';

interface ContainerProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, color }) => css`
    border: 1px solid ${theme.palette.primary.contrast};
    border-radius: ${theme.layout.borderRadius.medium};

    padding: ${theme.layout.spacing(2)};
    transition: all 0.2s;

    display: grid;
    grid-template-columns: 28px 1fr 1fr;
    grid-template-areas: 'remove level color' 'remove tag name';
    gap: ${theme.layout.spacing(2)};

    background-color: ${color};
    color: ${getContrastColor(color)};

    + div,
    + button {
      margin-top: ${theme.layout.spacing(3)};
    }

    @media (max-width: ${theme.layout.breakpoints.md}) {
      grid-template-columns: 28px 1fr;
      grid-template-areas: 'remove level' 'remove tag' 'remove name' 'remove color';
    }
  `}
`;

interface SInputProps {
  area: string;
  color: string;
}

export const SInput = styled(Input)<SInputProps>`
  ${({ theme, area, color }) => css`
    background-color: transparent;
    border: none;
    border-bottom: 2px groove ${theme.palette.secondary.main};
    border-radius: ${() => {
      const radius = theme.layout.borderRadius.small;

      return `${radius} ${radius} 0 0`;
    }};
    transition: all 0.2s;
    padding: ${theme.layout.spacing(2, 3, 1)};
    grid-area: ${area};

    color: ${getContrastColor(color)};

    &:focus {
      background-color: ${theme.palette.primary.light};
      border-color: ${theme.palette.secondary.light};
      color: ${theme.palette.primary.contrast} !important;
    }

    input {
      width: auto;
    }
  `}
`;

export const ColorInput = styled(ColorInputDefault)`
  ${({ theme }) => css`
    border: 2px groove ${theme.palette.secondary.main};
    transition: all 0.3s;

    grid-area: color;

    &::after {
      content: 'Cor';
      position: absolute;
      left: ${theme.layout.spacing(1)};
      pointer-events: none;
    }

    &:hover {
      border-color: ${theme.palette.secondary.light};
    }

    .color-viewer {
      border: 0;
      border-radius: 0;
    }
  `}
`;
