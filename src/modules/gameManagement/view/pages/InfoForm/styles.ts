import styled from 'styled-components';
import { Form } from 'formik';

export const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.layout.spacing(3, 6)};
`;

export const OTODO = styled.div`
  .input-group button[type='reset'] {
    color: ${({ theme }) => theme.palette.secondary.main};
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
