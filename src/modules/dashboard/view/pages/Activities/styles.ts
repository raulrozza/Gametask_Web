import styled, { css } from 'styled-components';
import { ReducingDiv } from 'components/PageWrapper/styles';

export const Container = styled(ReducingDiv)`
  ${({ theme, reduced = false }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: ${reduced
      ? css`repeat(3, 1fr)`
      : css`repeat(4, 1fr)`};
    grid-gap: 8px;

    .activity {
      min-width: 100px;
      padding: 5px;
      background: ${theme.palette.primary.dark};
      box-shadow: 0px 0px 0px 0px ${theme.palette.primary.dark};
      border-radius: 10px;
      text-align: center;
      transition: all 0.5s;
      position: relative;

      &.center {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .activity-xp {
          position: absolute;
          top: 5px;
        }
      }

      &:hover {
        background-color: ${theme.palette.primary.main};
        box-shadow: 0px 0px 3px 2px ${theme.palette.primary.dark};

        button {
          visibility: visible;
        }
      }

      button {
        visibility: hidden;
      }

      .activity-name {
        font-size: 16px;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .activity-rules {
        font-size: 12px;
        margin-top: 5px;
        color: ${theme.palette.secondary.light};
      }

      .activity-xp {
        color: ${theme.palette.secondary.main};
        font-size: 24px;
        font-weight: bold;
        text-align: left;
      }
    }

    .edit-button {
      position: absolute;
      bottom: 2px;
      right: 2px;
      color: ${theme.palette.primary.dark};
      font-size: 16px;
      border: none;
      background-color: transparent;
      margin-left: 2px;
      cursor: pointer;
    }

    ${reduced &&
    css`
      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }
    `}

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 396px) {
      grid-template-columns: repeat(1, 1fr);
    }
  `}
`;
