import styled, { css } from 'styled-components';

interface ContainerProps {
  horizontalPosition?: 'left' | 'right';
}

export const ContainerProps = styled.button<ContainerProps>`
  ${({ theme, horizontalPosition = 'left' }) => css`
    position: absolute;

    top: ${theme.layout.spacing(1)};
    ${horizontalPosition}: ${theme.layout.spacing(1)};

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

    &:hover {
      background-color: ${theme.palette.error.dark};
    }
  `}
`;
