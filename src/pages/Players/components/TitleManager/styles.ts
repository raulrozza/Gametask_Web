import styled from 'styled-components';
import { RequestsContainer } from '../../styles';

export const Container = styled(RequestsContainer)`
  width: 360px;

  header {
    display: flex;
    justify-content: space-between;

    button {
      background-color: ${({ theme }) => theme.palette.secondary.main};
      color: ${({ theme }) => theme.palette.secondary.contrast};
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
        background-color: ${({ theme }) => theme.palette.secondary.light};
      }
    }
  }

  ul {
    margin-top: 8px;
    padding: 4px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const NoTitles = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
`;
