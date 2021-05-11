import styled, { css } from 'styled-components';
import { Form } from 'formik';

export const Container = styled.section`
  ${({ theme }) => css`
    width: 100%;
    max-height: 200vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: ${theme.layout.spacing(4)};
    overflow-y: auto;
    scrollbar-width: thin;
  `}
`;

export const Column = styled.div`
  width: 100%;
  max-width: 540px;
  text-align: center;

  p {
    margin-bottom: ${({ theme }) => theme.layout.spacing(3)};
  }

  footer {
    margin: ${({ theme }) => theme.layout.spacing(1, 0)};
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-bottom: ${({ theme }) => theme.layout.spacing(3)};
`;

export const LevelForm = styled(Form)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  opacity: 0.8;
  padding: ${({ theme }) => theme.layout.spacing(2)};
  border-radius: ${({ theme }) => theme.layout.borderRadius.small};
`;
