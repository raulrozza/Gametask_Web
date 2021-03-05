import { lighten } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  $fullWidth: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, $fullWidth }) => css`
    width: ${$fullWidth ? '100%' : '240px'};

    margin-bottom: ${theme.layout.spacing(1)};

    position: relative;
  `}
`;

export const InputField = styled.input`
  ${({ theme }) => css`
    width: 100%;
    height: 36px;

    background-color: ${theme.palette.primary.light};

    outline: 0;
    border: 1px solid ${theme.palette.gray[300]};
    border-radius: ${theme.layout.borderRadius.small};
    padding: ${theme.layout.spacing(0, 3)};

    line-height: 24px;
    font-size: 14px;

    transition: border-color 0.5s;

    &:focus {
      border-color: ${theme.palette.secondary.main};
    }
  `}
`;

interface TitleOptionsProps {
  visible: boolean;
}

export const TitleOptions = styled.div<TitleOptionsProps>`
  ${({ theme, visible }) => css`
    position: absolute;
    width: inherit;

    z-index: 10;

    overflow: hidden;

    visibility: ${visible ? 'visible' : 'hidden'};

    border-radius: ${() => {
      const radius = theme.layout.borderRadius.small;

      return `0 0 ${radius} ${radius}`;
    }};

    /* max-height: 80%;
    background-color: ${theme.palette.primary.dark};
    border: 1px solid ${theme.palette.primary.contrast};
    font-size: 14px;
    visibility: ${visible ? 'visible' : 'hidden'}; */

    /* ul {
      list-style: none;
    }

    li,
    button {
      min-height: 20px;
      padding: 2px 10px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background-color: ${theme.palette.primary.main};
      }
    }

    button {
      border: none;
      width: 100%;
      height: 100%;
      transition: background-color 0.2s;
    } */
  `}
`;

export const AddTitleButton = styled.button`
  ${({ theme, disabled }) => css`
    border: none;
    width: 100%;
    min-height: 20px;
    padding: ${theme.layout.spacing(1, 2)};
    cursor: ${disabled ? 'default' : 'pointer'};

    transition: background-color 0.2s;

    ${!disabled
      ? css`
          opacity: 0.7;

          &:hover {
            background-color: ${lighten(0.1, theme.palette.primary.light)};
          }
        `
      : ''}
  `}
`;
