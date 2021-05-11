import styled, { css } from 'styled-components';

export const Container = styled.input`
  ${({ theme }) => css`
    color: ${theme.palette.primary.contrast};
    background-color: transparent;
    border: none;
    border-bottom: 2px groove ${theme.palette.secondary.main};
    border-radius: ${() => {
      const radius = theme.layout.borderRadius.small;

      return `${radius} ${radius} 0 0`;
    }};
    transition: all 0.2s;
    padding: ${theme.layout.spacing(2, 3, 1)};

    &:focus {
      background-color: ${theme.palette.primary.light};
      border-color: ${theme.palette.secondary.light};
    }

    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;

    grid-area: experience;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
    }
  `}
`;
