import styled, { css } from 'styled-components';

// Styles
import { Button, Form as DefaultForm } from 'styles';

// Types
import { FormToggleButtonProps, FormProps } from './types';

export const HomePage = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.dark};
    color: ${theme.palette.primary.contrast};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      cursor: default;
      margin-bottom: 20px;
      background: ${theme.palette.secondary.dark};
      color: ${theme.palette.secondary.contrast};
      padding: 10px 20px;
      border-radius: 15px;
      text-align: center;
    }

    .container {
      background: ${theme.palette.primary.main};
      display: flex;
      flex-direction: row;
      border-radius: 3px;

      h2 {
        color: ${theme.palette.secondary.light};
        margin-bottom: 10px;

        @media (max-width: 768px) {
          display: none;
        }
      }

      .input-group {
        width: 200px;
      }

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  `}
`;

export const FormToggle = {
  Container: styled.div`
    display: none;

    @media (max-width: 768px) {
      width: 100%;
      display: flex;
    }
  `,
  Button: styled(Button)<FormToggleButtonProps>`
    @media (max-width: 768px) {
      width: 50%;
      border-radius: 0px;
      font-weight: bold;

      ${({ active, theme }) =>
        active &&
        css`
          background-color: ${theme.palette.primary.main};
          color: ${theme.palette.secondary.light};
        `}
    }
  `,
};

export const Form = styled(DefaultForm)<FormProps>`
  margin: 15px;
  min-width: 300px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    transition: all 0.5s;

    ${({ shown = false }) =>
      !shown &&
      css`
        height: 0px;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
      `}
  }
`;
