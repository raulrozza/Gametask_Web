import styled, { css } from 'styled-components';
import { Form as FormikForm } from 'formik';

interface ContainerProps {
  $visible: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, $visible }) =>
    css`
      width: 0px;

      overflow: hidden;

      transition: width 0.2s, height 0.2s;

      ${$visible
        ? css`
            border-left: 1px solid ${theme.palette.primary.dark};

            width: 400px;
          `
        : ''}

      @media(max-width: ${theme.layout.breakpoints.lg}) {
        border-left: none;

        width: 100%;

        height: 0px;

        ${$visible
          ? css`
              border-bottom: 1px solid ${theme.palette.primary.dark};

              height: 265px;
            `
          : ''}
      }
    `}
`;

export const Form = styled(FormikForm)`
  width: 100%;

  padding: ${({ theme }) => theme.layout.spacing(3, 12)};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
