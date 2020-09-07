import styled from 'styled-components';
import { RequestsContainer } from '../styles';

export const Container = styled(RequestsContainer)`
  width: 360px;

  header {
    display: flex;
    justify-content: space-between;

    button {
      background-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondaryContrast};
      border: none;
      border-radius: 4px;

      height: 28px;
      width: 28px;
      font-size: 14px;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.secondaryExtraIntense};
      }
    }
  }

  ul {
    margin-top: 8px;
    padding: 4px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.primaryLowShade};
  }
`;
