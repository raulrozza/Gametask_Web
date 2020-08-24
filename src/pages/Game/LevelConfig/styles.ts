import styled, { css } from 'styled-components';

export const LevelConfigContainer = styled.section`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px;
    max-height: 200vh;
    overflow-y: auto;

    > div {
      width: 100%;
      max-width: 540px;
      text-align: center;
    }

    h2 {
      color: ${theme.secondary};
      margin-bottom: 12px;
    }

    p {
      margin-bottom: 12px;
    }

    .level-info-container {
      background-color: ${theme.primaryIntense};
      opacity: 0.8;
      padding: 8px;
      border-radius: 8px;
    }

    .info-item {
      background-color: ${theme.primaryLowShade};
      border-radius: 10px;
      padding: 10px;
      transition: all 0.2s;
      display: grid;
      grid-template-columns: 60px 100px 1fr;
      grid-gap: 12px;
      position: relative;

      + .info-item,
      + button {
        margin-top: 12px;
      }

      &:hover {
        background-color: ${theme.primaryShade};
      }

      span {
        color: ${theme.primaryContrast};
        display: flex;
        align-items: flex-end;
        padding-bottom: 4px;
        font-size: 14px;
      }

      input {
        color: ${theme.primaryContrast};
        background-color: transparent;
        border: none;
        border-bottom: 2px groove ${theme.secondary};
        border-radius: 5px 5px 0 0;
        transition: all 0.2s;
        padding: 8px 12px 4px;

        &:focus {
          background-color: ${theme.primaryExtraIntense};
          border-color: ${theme.secondaryIntense};
        }
      }

      input[type='number'] {
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
      }
      input::-webkit-inner-spin-button,
      input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
      }

      @media (max-width: 576px) {
        padding-left: 10%;
        padding-right: 10%;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          'level experience'
          'title title';

        .title {
          grid-area: title;
        }
        .experience {
          grid-area: experience;
        }
        .level {
          grid-area: level;
        }
      }

      @media (max-width: 440px) {
        padding: 10px;
      }

      @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .add-item {
      width: 100%;
      height: 60px;
      border-radius: 10px;
      background-color: transparent;
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
