import styled, { css } from 'styled-components';

interface ContainerProps {
  $visible: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, $visible }) =>
    css`
      width: 0px;

      transition: width 0.2s;

      ${$visible
        ? css`
            border-left: 1px solid ${theme.palette.primary.dark};

            width: 420px;
          `
        : ''}

      @media(max-width: ${theme.layout.breakpoints.lg}) {
        border-left: none;
      }
    `}
`;
