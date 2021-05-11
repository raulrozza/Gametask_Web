import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    font-size: 48px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
