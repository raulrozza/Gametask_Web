import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  color: ${({ theme }) => theme.secondaryExtraIntense};
  border-bottom: 1px solid ${({ theme }) => theme.primaryShade};

  a {
    background: transparent;
    border: none;
    margin-right: 10px;
    display: flex;
    align-items: center;

    svg {
      font-size: 24px;
      color: ${({ theme }) => theme.secondaryExtraIntense};
      cursor: pointer;
      transition: all 0.2s;
    }

    &:hover svg {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;
