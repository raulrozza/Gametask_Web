import styled, { css } from 'styled-components';

// Components
import ColorInputDefault from 'components/ColorInput';

export const Container = styled.section`
  ${({ theme }) => css`
    margin: 0 auto;
    width: 100%;
    max-width: 550px;
    padding: ${theme.layout.spacing(4)};
    text-align: center;

    h2 {
      color: ${theme.palette.secondary.main};
      margin-bottom: ${theme.layout.spacing(3)};
    }

    p {
      margin-bottom: ${theme.layout.spacing(3)};
    }

    footer {
      margin: ${theme.layout.spacing(1, 0)};
    }
  `}
`;

export const ColorInput = styled(ColorInputDefault)`
  ${({ theme }) => css`
    border: 2px groove ${theme.palette.secondary.main};
    transition: all 0.3s;

    &::after {
      content: 'Cor';
      position: absolute;
      left: 5px;
      pointer-events: none;
    }

    &:hover {
      border-color: ${theme.palette.secondary.light};
    }

    .color-viewer {
      border: 0;
      border-radius: 0;
    }

    @media (max-width: 576px) {
      grid-area: color;
    }

    @media (max-width: 400px) {
      width: 90%;
    }
  `}
`;
