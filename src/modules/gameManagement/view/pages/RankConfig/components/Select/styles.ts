import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;

  grid-area: level;

  align-items: center;
`;

export const SSelect = styled.select`
  ${({ theme }) => css`
    background-color: transparent;
    border: none;

    cursor: pointer;
    background-color: ${theme.palette.primary.light};
    border-color: ${theme.palette.secondary.light};
    color: ${theme.palette.primary.contrast};

    border-bottom: 2px groove ${theme.palette.secondary.main};
    border-radius: ${() => {
      const radius = theme.layout.borderRadius.small;

      return `${radius} ${radius} 0 0`;
    }};
    transition: all 0.2s;
    padding: ${theme.layout.spacing(2, 3, 1)};

    margin-left: ${theme.layout.spacing(1)};

    flex: 1;
  `}
`;
