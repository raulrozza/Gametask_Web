import styled, { css } from 'styled-components';
import { InfoBox } from '../../styles';

export const GameContainerDiv = styled(InfoBox)`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    text-align: center;

    div {
      margin: 10px 0;
    }

    .img-container {
      width: 80px;
      height: 80px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .name {
      font-weight: bolder;
      font-size: 24px;
    }

    button:not(.config-btn) {
      width: 280px;
      background-color: ${theme.palette.primary.dark};
      border: 1px solid ${theme.palette.primary.dark};
      border-bottom: none;
      padding: 8px 0;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &.switch-game {
        border-top: none;
      }

      &.logout {
        color: ${theme.palette.secondary.main};
      }
    }

    .user-info {
      font-size: 14px;

      strong {
        color: ${theme.palette.secondary.light};
      }
    }

    button.config-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 24px;
      transition: color 0.4s;

      &:hover {
        color: ${theme.palette.primary.dark};
      }
    }
  `}
`;
