import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.light};
  opacity: 0.8;
  padding: ${({ theme }) => theme.layout.spacing(2)};
  border-radius: ${({ theme }) => theme.layout.borderRadius.small};
`;

export const AddLevelButton = styled.button`
  ${({ theme }) => css`
    width: 100%;
    height: 60px;
    border-radius: ${theme.layout.borderRadius.medium};
    background-color: transparent;
    border: 1px dashed ${theme.palette.primary.contrast};
    cursor: pointer;
    font-size: 18px;
    transition: all 0.4s;

    &:hover {
      background-color: ${transparentize(0.3, theme.palette.secondary.main)};
      color: ${theme.palette.secondary.contrast};
      border-color: ${theme.palette.secondary.contrast};
    }
  `}
`;
