import styled, { css } from 'styled-components';
import { Form as FormikForm } from 'formik';

// If using a regular form, pass the 'as="form"' property
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
      border: 1px solid ${theme.palette.primary.dark};
      padding: 0 10px;
      line-height: 24px;
      font-size: 14px;
      transition: border-color 0.5s;
      background-color: ${theme.palette.primary.light};

      &:focus {
        border-color: ${theme.palette.secondary.main};
      }
    }

    textarea {
      resize: vertical;
      min-height: 72px;
    }
  `}
`;

export default Form;
