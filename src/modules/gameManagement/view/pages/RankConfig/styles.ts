import styled, { css } from 'styled-components';

// Components
import ColorInputDefault from 'components/ColorInput';

interface RankItemProps {
  backgroundColor: string;
  textColor: string;
}

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

export const RankItem = styled.div<RankItemProps>`
  ${({ theme, backgroundColor, textColor }) => css`
    border: 1px solid ${theme.palette.primary.contrast};
    border-radius: ${theme.layout.borderRadius.medium};
    padding: ${theme.layout.spacing(2)};
    transition: all 0.2s;
    display: grid;
    grid-template-columns: 2fr 60px 2fr 80px;
    grid-gap: ${theme.layout.spacing(3)};
    position: relative;
    align-items: center;

    background-color: ${backgroundColor};
    color: ${textColor};

    + .item,
    + button {
      margin-top: ${theme.layout.spacing(3)};
    }

    input,
    select {
      background-color: transparent;
      border: none;
      border-bottom: 2px groove ${theme.palette.secondary.main};
      border-radius: ${() => {
        const radius = theme.layout.borderRadius.small;

        return `${radius} ${radius} 0 0`;
      }}
      transition: all 0.2s;
      padding: ${theme.layout.spacing(2, 3, 1)};
    }

    select {
      cursor: pointer;
      background-color: ${theme.palette.primary.light};
      border-color: ${theme.palette.secondary.light};
      color: ${theme.palette.primary.contrast};
    }

    input {
      color: ${textColor};

      &:focus {
        background-color: ${theme.palette.primary.light};
        border-color: ${theme.palette.secondary.light};
        color: ${theme.palette.primary.contrast} !important;
      }
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas: 'level tag tag' 'color name name';

      .select {
        grid-area: level;
      }

      .tag {
        grid-area: tag;
      }

      .name {
        grid-area: name;
      }
    }

    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      align-items: center;

      input {
        width: 95%;
      }
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
