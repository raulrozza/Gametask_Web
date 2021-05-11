import styled from 'styled-components';

export const Button = styled.button`
  color: ${({ theme }) => theme.palette.secondary.main};
  background-color: transparent;
  border: none;
  cursor: pointer;

  align-self: center;

  &:hover {
    text-decoration: underline;
  }
`;
