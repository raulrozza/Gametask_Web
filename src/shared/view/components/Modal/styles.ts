import styled, { css } from 'styled-components';

export const Background = styled.div`
  position: fixed;
  background-color: #000b;

  width: 100vw;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.layout.spacing(3)};
`;

interface ContainerProps {
  size: 'md' | 'sm' | 'lg';
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, size }) => css`
    background-color: ${theme.palette.primary.main};
    border-radius: ${theme.layout.borderRadius.medium};
    border: 1px solid ${theme.palette.primary.light};
    padding: ${theme.layout.spacing(2)};
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;

    .modal-title {
      min-width: ${() => {
        switch (size) {
          case 'sm':
            return '25vw';
          case 'md':
            return '50vw';
          case 'lg':
            return '50vw';
          default:
            return '0vw';
        }
      }};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 4px;
      border: 0 solid ${theme.palette.primary.dark};
      border-bottom-width: 1px;

      h2 {
        color: ${theme.palette.secondary.main};
      }

      button {
        background-color: ${theme.palette.primary.main};
        border: 1px solid ${theme.palette.primary.dark};
        color: ${theme.palette.primary.contrast};
        border-radius: 5px;
        padding: 4px;
        display: flex;
        place-items: center;
        cursor: pointer;
      }
    }

    .modal-children {
      max-height: calc(100vh - 88px);
      overflow-y: auto;
      scrollbar-width: thin;
    }
  `}
`;
