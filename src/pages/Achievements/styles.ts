import styled, { css } from 'styled-components';
import { ReducingDiv } from '../../components/PageWrapper/styles';

export const Container = styled(ReducingDiv)`
  ${({ reduced = false }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: ${reduced
      ? css`repeat(3, 1fr)`
      : css`repeat(5, 1fr)`};
    grid-gap: 8px;

    /* Responsiveness */
    @media (max-width: 992px) {
      grid-template-columns: ${reduced
        ? css`repeat(2, 1fr)`
        : css`repeat(4, 1fr)`};
    }

    /* Responsiveness */
    @media (max-width: 768px) {
      ${reduced &&
      css`
        grid-template-columns: repeat(4, 1fr);
      `}
    }

    /* Responsiveness */
    @media (max-width: 576px) {
      grid-template-columns: repeat(3, 1fr);
    }

    /* Responsiveness */
    @media (max-width: 396px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`;
