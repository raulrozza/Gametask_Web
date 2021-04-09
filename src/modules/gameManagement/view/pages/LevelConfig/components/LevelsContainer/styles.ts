import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

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

export const LevelItem = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.dark};
    border-radius: ${theme.layout.borderRadius.medium};
    padding: ${theme.layout.spacing(2)};
    transition: all 0.2s;
    display: grid;
    grid-template-columns: 30px 60px 100px 1fr;
    grid-gap: ${theme.layout.spacing(3)};
    grid-template-areas: 'remove level experience title';
    position: relative;

    + div,
    + button {
      margin-top: ${theme.layout.spacing(3)};
    }

    &:hover {
      background-color: ${theme.palette.primary.dark};
    }

    @media (max-width: ${theme.layout.breakpoints.md}) {
      grid-template-columns: 30px 1fr;
      grid-template-areas:
        'remove level'
        'remove experience'
        'remove title';

      .title {
        grid-area: title;
      }
      .experience {
        grid-area: experience;
      }
    }
  `}
`;

export const LevelText = styled.span`
  color: ${({ theme }) => theme.palette.primary.contrast};
  display: flex;
  align-items: flex-end;
  padding-bottom: ${({ theme }) => theme.layout.spacing(1)};
  font-size: 14px;
  grid-area: level;
`;
