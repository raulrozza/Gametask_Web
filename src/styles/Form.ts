import styled, { css } from 'styled-components';
import { Form as FormikForm } from 'formik';

const Form = styled(FormikForm)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;

    .input-group {
      width: 240px;
      margin-bottom: 4px;
    }

    input,
    textarea {
      width: 100%;
      height: 36px;
      border-radius: 5px;
      border: 1px solid ${theme.primaryShade};
      padding: 0 10px;
      line-height: 24px;
      font-size: 14px;
      transition: border-color 0.5s;
      background-color: ${theme.primaryIntense};

      &:focus {
        border-color: ${theme.secondary};
      }
    }

    textarea {
      resize: vertical;
    }

    .submit {
      cursor: pointer;
      background-color: ${theme.primary};
      color: ${theme.secondary};
      border: 1px solid ${theme.secondary};
      border-radius: 2px;
      line-height: 24px;
      font-size: 16px;
      padding: 8px 12px;
      transition: all 0.2s;
    }

    .submit:hover:not(:disabled) {
      background-color: ${theme.secondary};
      color: ${theme.secondaryContrast};
    }

    &.activity-form .submit:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `}
`;

export const ErrorField = styled.div`
  background-color: rgb(253, 57, 57);
  color: #fff;
  padding: 7px 5px 2px;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
  border-radius: 0px 0px 5px 5px;
`;

export default Form;
