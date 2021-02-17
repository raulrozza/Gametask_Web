import styled, { css } from 'styled-components';

export const LoadingContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;

    background: ${theme.palette.primary.main};
    color: ${theme.palette.secondary.main};

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;
