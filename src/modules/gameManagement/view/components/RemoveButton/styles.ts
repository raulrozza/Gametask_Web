import styled, { css } from 'styled-components';

export const ContainerProps = styled.button`
  ${({ theme }) => css`
    width: 24px;
    height: 24px;

    border: none;
    border-radius: 50%;

    font-size: 16px;
    color: ${theme.palette.error.contrast};

    background-color: ${theme.palette.error.main};
    transition: background-color 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    grid-area: remove;

    justify-self: center;

    &:hover {
      background-color: ${theme.palette.error.dark};
    }

    @media (max-width: ${theme.layout.breakpoints.md}) {
      margin-top: ${theme.layout.spacing(2)};
    }
  `}
`;
