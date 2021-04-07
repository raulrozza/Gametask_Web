import styled, { css } from 'styled-components';
import { Form } from 'formik';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 100%;
    max-height: 200vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: ${theme.layout.spacing(4)};
    overflow-y: auto;
    scrollbar-width: thin;

    .info-item {
      background-color: ${theme.palette.primary.dark};
      border-radius: ${theme.layout.borderRadius.medium};
      padding: ${theme.layout.spacing(2)};
      transition: all 0.2s;
      display: grid;
      grid-template-columns: 60px 100px 1fr;
      grid-gap: ${theme.layout.spacing(3)};
      position: relative;

      + .info-item,
      + button {
        margin-top: ${theme.layout.spacing(3)};
      }

      &:hover {
        background-color: ${theme.palette.primary.dark};
      }

      span {
        color: ${theme.palette.primary.contrast};
        display: flex;
        align-items: flex-end;
        padding-bottom: ${theme.layout.spacing(1)};
        font-size: 14px;
      }

      input {
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
        padding: ${theme.layout.spacing(2)};
      }

      @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  `}
`;

export const Column = styled.div`
  width: 100%;
  max-width: 540px;
  text-align: center;

  p {
    margin-bottom: ${({ theme }) => theme.layout.spacing(3)};
  }

  footer {
    margin: ${({ theme }) => theme.layout.spacing(1, 0)};
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-bottom: ${({ theme }) => theme.layout.spacing(3)};
`;

export const LevelForm = styled(Form)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  opacity: 0.8;
  padding: ${({ theme }) => theme.layout.spacing(2)};
  border-radius: ${({ theme }) => theme.layout.borderRadius.small};
`;
