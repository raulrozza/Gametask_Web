import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.layout.spacing(1)};
    background: ${theme.palette.primary.main};
    box-shadow: 0px 0px 1px 0px ${theme.palette.primary.dark};
    border-radius: ${theme.layout.borderRadius.small};
    text-align: center;
    position: relative;

    button {
      visibility: hidden;
    }

    transition: all 0.2s;

    &:hover {
      background-color: ${lighten(0.1, theme.palette.primary.main)};
      box-shadow: 0px 0px 3px 2px ${theme.palette.primary.dark};

      button {
        visibility: visible;
      }
    }
  `}
`;

export const Experience = styled.div`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 24px;
  font-weight: bold;
  text-align: left;
`;

export const Name = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.layout.spacing(1)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Rules = styled.div`
  font-size: 12px;
  margin-top: ${({ theme }) => theme.layout.spacing(1)};
  color: ${({ theme }) => theme.palette.secondary.main};
`;
