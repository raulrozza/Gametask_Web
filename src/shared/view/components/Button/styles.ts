import Loading from 'react-loading';
import styled, { css } from 'styled-components';

interface StyledButtonProps {
  outline: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ theme, outline }) => css`
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

    border-radius: ${theme.layout.borderRadius.small};
    padding: ${theme.layout.spacing(2, 3)};
    transition: all 0.2s;

    position: relative;

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
      opacity: 0.6;
      cursor: default;
    }
  `}
`;

interface VisibilityProps {
  $visible: boolean;
}

export const Text = styled.span<VisibilityProps>`
  line-height: 24px;
  font-size: 16px;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

export const ChildrenContainer = styled.div<VisibilityProps>`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  height: 24px;
`;

export const Spinner = styled(Loading)<VisibilityProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -8px;
  margin-left: -8px;
  color: inherit;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;
