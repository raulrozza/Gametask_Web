import styled, { css } from 'styled-components';
import { RequestsContainer } from '../../styles';

export const Container = styled(RequestsContainer)`
  width: 360px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const AddTitleButton = styled.button`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrast};
  border: none;
  border-radius: ${({ theme }) => theme.layout.borderRadius.small};

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
`;

export const TitleList = styled.ul`
  ${({ theme }) => css`
    margin-top: ${theme.layout.spacing(2)};
    padding: ${theme.layout.spacing(1)};
    border-radius: ${theme.layout.borderRadius.small};
    background-color: ${theme.palette.primary.dark};
  `}
`;

export const NoTitles = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
`;
