import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.layout.spacing(1)};
    margin: ${theme.layout.spacing(1)};
    gap: ${theme.layout.spacing(1)};
    border-radius: ${theme.layout.borderRadius.medium};
    font-weight: bold;
    text-align: center;
    border: 1px solid ${theme.palette.secondary.dark};

    min-height: 72px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    max-width: 180px;

    .name {
      font-size: 16px;
      text-transform: uppercase;
      min-height: 22px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .experience {
      color: ${theme.palette.secondary.main};
      font-size: 20px;
      min-height: 24px;
    }
  `}
`;
