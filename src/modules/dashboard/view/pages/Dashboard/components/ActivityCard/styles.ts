import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.layout.spacing(1)};
    margin: ${theme.layout.spacing(1)};
    border-radius: ${theme.layout.borderRadius.medium};
    font-weight: bold;
    text-align: center;
    border: 1px solid ${theme.palette.secondary.dark};

    .name {
      font-size: 16px;
      text-transform: uppercase;
      height: 40px;
      margin-bottom: ${theme.layout.spacing(1)};
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .experience {
      color: ${theme.palette.secondary.main};
      font-size: 20px;
      height: 32px;
    }
  `}
`;
