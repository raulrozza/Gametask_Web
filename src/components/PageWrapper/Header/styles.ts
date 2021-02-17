import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  color: ${({ theme }) => theme.palette.secondary.light};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.dark};

  a {
    background: transparent;
    border: none;
    margin-right: 10px;
    display: flex;
    align-items: center;

    svg {
      font-size: 24px;
      color: ${({ theme }) => theme.palette.secondary.light};
      cursor: pointer;
      transition: all 0.2s;
    }

    &:hover svg {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;
