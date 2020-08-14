import styled, { css } from 'styled-components';
import { ColorInputWrapperProps } from './types';

export const ColorInputWrapper = styled.div<ColorInputWrapperProps>`
  ${({ theme, color, showPicker }) => css`
    position: relative;
    display: flex;
    margin-bottom: 5px;
    align-items: center;

    label {
      font-size: 14px;
      width: 50%;
    }

    .color-viewer {
      width: 50%;
      height: 36px;
      border-radius: 5px;
      border: 1px solid ${theme.primaryShade};
      cursor: pointer;
      background-color: ${color};

      &:hover {
        border-color: ${theme.primaryLowShade};
      }
    }

    .color-picker {
      position: absolute;
      bottom: -100px;
      right: -225px;
      display: ${showPicker ? 'block' : 'none'};
      z-index: 2;

      .chrome-picker {
        background-color: ${theme.primaryIntense} !important;

        input {
          color: ${theme.primaryContrast} !important;
        }

        span {
          color: ${theme.primaryExtraShade} !important;
        }

        svg {
          fill: ${theme.primaryContrast} !important;
        }
      }

      @media (max-width: 768px) {
        right: 0;
        z-index: 2;
      }
    }
  `}
`;
