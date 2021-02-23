import styled, { css } from 'styled-components';

interface BackgroundProps {
  open: boolean;
}

export const Background = styled.div<BackgroundProps>`
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

  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};

  transition: opacity 0.2s;
`;

type Sizes = 'md' | 'sm' | 'lg';

interface ContainerProps {
  size: Sizes;
}

const containerSizes: Record<Sizes, string> = {
  sm: '25vw',
  md: '50vw',
  lg: '75vw',
};

export const Container = styled.div<ContainerProps>`
  ${({ theme, size }) => css`
    background-color: ${theme.palette.primary.main};
    border-radius: ${theme.layout.borderRadius.medium};
    border: 1px solid ${theme.palette.primary.light};

    padding: ${theme.layout.spacing(2)};
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;

    width: ${containerSizes[size]};
  `}
`;

export const ModalTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${theme.layout.spacing(1)};
    border: 0 solid ${theme.palette.primary.dark};
    border-bottom-width: 1px;

    h2 {
      color: ${theme.palette.secondary.main};
    }
  `}
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.dark};
    color: ${theme.palette.primary.contrast};
    border-radius: ${theme.layout.borderRadius.small};
    padding: ${theme.layout.spacing(1)};
    display: flex;
    place-items: center;
    cursor: pointer;
  `}
`;

export const ChildrenContainer = styled.div`
  max-height: calc(100vh - 88px);
  overflow-y: auto;
  scrollbar-width: thin;
`;
