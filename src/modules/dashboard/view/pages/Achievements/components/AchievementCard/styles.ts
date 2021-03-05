import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: 5px;
    background: ${theme.palette.primary.main};
    box-shadow: 0px 0px 0px 0px ${theme.palette.primary.dark};
    border-radius: 10px;

    text-align: center;
    position: relative;

    transition: all 0.2s;

    overflow: hidden;

    button {
      visibility: hidden;
    }

    &:hover {
      background-color: ${lighten(0.1, theme.palette.primary.main)};
      box-shadow: 0px 0px 3px 2px ${theme.palette.primary.dark};

      button {
        visibility: visible;
      }
    }

    .edit-button {
      position: absolute;
      bottom: 2px;
      right: 2px;
      color: ${({ theme }) => theme.palette.primary.dark};
      font-size: 16px;
      border: none;
      background-color: transparent;
      margin-left: 2px;
      cursor: pointer;
    }
  `}
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: ${({ theme }) => theme.layout.spacing(1)};
  border-radius: 50%;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  min-height: 20px;
  width: inherit;
  text-align: center;

  span {
    color: ${({ theme }) => theme.palette.secondary.light};
  }
`;

export const Description = styled.div`
  font-size: 14px;
`;
