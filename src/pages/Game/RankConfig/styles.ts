import styled, { css } from 'styled-components';
import { RankItemProps } from '../types';

// Components
import ColorInputDefault from '../../../components/ColorInput';

export const RankConfigContainer = styled.section`
  ${({ theme }) => css`
    margin: 0 auto;
    width: 100%;
    max-width: 550px;
    padding: 18px;
    text-align: center;

    h2 {
      color: ${theme.secondary};
      margin-bottom: 12px;
    }

    p {
      margin-bottom: 12px;
    }

    .add-item {
      width: 100%;
      height: 60px;
      border-radius: 10px;
      background-color: ${theme.primaryTransparent};
      border: 1px dashed ${theme.primaryContrast};
      cursor: pointer;
      font-size: 18px;
      transition: all 0.4s;

      &:hover {
        background-color: ${theme.secondaryTransparent};
        color: ${theme.secondaryContrast};
        border-color: ${theme.secondaryContrast};
      }
    }

    footer {
      margin: 5px 0;
    }
  `}
`;

export const RankItem = styled.div<RankItemProps>`
  ${({ theme, backgroundColor, textColor }) => css`
    border: 1px solid ${theme.primary};
    border-radius: 10px;
    padding: 10px;
    transition: all 0.2s;
    display: grid;
    grid-template-columns: 2fr 60px 2fr 80px;
    grid-gap: 12px;
    position: relative;
    align-items: center;

    background-color: ${backgroundColor};
    color: ${textColor};

    + .item,
    + button {
      margin-top: 12px;
    }

    input,
    select {
      background-color: transparent;
      border: none;
      border-bottom: 2px groove ${theme.secondary};
      border-radius: 5px 5px 0 0;
      transition: all 0.2s;
      padding: 8px 12px 4px;
    }

    select {
      cursor: pointer;
      background-color: ${theme.primaryExtraIntense};
      border-color: ${theme.secondaryIntense};
      color: ${theme.primaryContrast};
    }

    input {
      color: ${textColor};

      &:focus {
        background-color: ${theme.primaryExtraIntense};
        border-color: ${theme.secondaryIntense};
        color: ${theme.primaryContrast} !important;
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
    border: 2px groove ${theme.secondary};
    transition: all 0.3s;

    &::after {
      content: 'Cor';
      position: absolute;
      left: 5px;
      pointer-events: none;
    }

    &:hover {
      border-color: ${theme.secondaryIntense};
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
