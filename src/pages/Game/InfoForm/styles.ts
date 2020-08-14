import styled from 'styled-components';
import DefaultForm from '../../../styles/Form';

export const Form = styled(DefaultForm)`
  .input-group button[type='reset'] {
    color: ${({ theme }) => theme.secondary};
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
