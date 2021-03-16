import styled, { css } from 'styled-components';

interface MutableOnEditionProps {
  editing: boolean;
}

export const Container = styled.li`
  display: grid;
  padding: ${({ theme }) => theme.layout.spacing(1)};
  height: 40px;
  gap: 0px;
  grid-template-columns: 1fr 32px;

  position: relative;
`;

export const Input = styled.input<MutableOnEditionProps>`
  ${({ theme, editing, disabled }) => css`
    padding: ${theme.layout.spacing(1)};

    border-radius: ${theme.layout.borderRadius.small};

    background-color: ${disabled || !editing
      ? 'transparent'
      : theme.palette.primary.light};

    ${editing || disabled
      ? css`
          border: 1px solid ${theme.palette.primary.contrast};

          color: ${theme.palette.primary.contrast};
        `
      : css`
          cursor: pointer;
          border: 1px solid transparent;

          color: ${theme.palette.secondary.main};

          transition: border-color 0.2s;

          &:hover {
            border-bottom: 1px solid ${theme.palette.secondary.main};
          }
        `};
  `}
`;

export const DeleteButton = styled.button<MutableOnEditionProps>`
  ${({ theme, editing }) => css`
    background-color: ${theme.palette.error.dark};
    border: 1px solid ${theme.palette.error.dark};
    color: white;
    cursor: pointer;

    border-radius: ${theme.layout.borderRadius.small};

    width: 32px;

    transition: all 0.2s;

    ${!editing &&
    css`
      display: none;
    `}

    &:hover {
      background-color: ${theme.palette.error.main};
      border: 1px solid ${theme.palette.error.main};
    }
  `}
`;
