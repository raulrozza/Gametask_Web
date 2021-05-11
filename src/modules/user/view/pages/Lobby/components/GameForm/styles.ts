import styled from 'styled-components';

export const Container = styled.div`
  form {
    max-width: 240px;
    margin: 0 auto;
    padding-top: ${({ theme }) => theme.layout.spacing(2)};
  }
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: ${({ theme }) => theme.layout.spacing(1)};
`;
