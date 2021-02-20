import styled, { css } from 'styled-components';
import { Form as FormikForm } from 'formik';

export interface FormProps {
  shown?: boolean;
}

const Form = styled(FormikForm)<FormProps>`
  margin: ${({ theme }) => theme.layout.spacing(4)};
  padding: ${({ theme }) => theme.layout.spacing(4)};

  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default Form;
