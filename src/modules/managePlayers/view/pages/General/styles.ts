import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const PlayersContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.gray[100]};
  min-height: 100vh;
  padding: ${({ theme }) => theme.layout.spacing(2)};
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
  }
`;

export const BackButton = styled(Link)`
  ${({ theme }) => css`
    position: fixed;
    top: ${theme.layout.spacing(2)};
    left: ${theme.layout.spacing(2)};
    font-size: 28px;
  `}
`;
