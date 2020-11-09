import styled, { css } from 'styled-components';

// Types
import { ColorPickerProps, ColorViewerProps } from './types';

export const Container = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 5px;
  align-items: center;

  label {
    font-size: 14px;
    width: 50%;
  }
`;

export const ColorViewer = styled.div<ColorViewerProps>`
  ${({ theme, color, hasLabel }) => css`
    width: ${hasLabel ? '50%' : '100%'};
    height: 36px;

    border-radius: 5px;
    border: 1px solid ${theme.primaryShade};

    cursor: pointer;

    background-color: ${color};

    &:hover {
      border-color: ${theme.primaryLowShade};
    }
  `}
`;

export const ColorPicker = styled.div<ColorPickerProps>`
  ${({ theme, showPicker }) => css`
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
  `}
`;
