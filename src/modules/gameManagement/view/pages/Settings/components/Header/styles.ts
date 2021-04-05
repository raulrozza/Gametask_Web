import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  color: ${({ theme }) => theme.palette.secondary.main};
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary.dark};
`;

export const BackLink = styled(Link)`
  ${({ theme }) => css`
    background: transparent;
    border: none;
    margin-right: ${theme.layout.spacing(2)};
    display: flex;
    align-items: center;

    svg {
      font-size: 24px;
      color: ${theme.palette.secondary.main};
      cursor: pointer;
      transition: all 0.2s;
    }

    &:hover svg {
      color: ${theme.palette.secondary.main};
    }
  `}
`;
