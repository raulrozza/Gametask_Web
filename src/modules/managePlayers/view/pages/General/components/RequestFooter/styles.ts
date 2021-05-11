import styled, { css } from 'styled-components';

export const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
  }
`;

export const Information = styled.cite`
  font-size: 14px;
  margin-right: ${({ theme }) => theme.layout.spacing(1)};
`;

export const DateText = styled.span`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 14px;
`;

const genericButtonStyles = css`
  padding: ${({ theme }) => theme.layout.spacing(1)};
  border-radius: ${({ theme }) => theme.layout.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s;

  & + button {
    margin-left: ${({ theme }) => theme.layout.spacing(1)};
  }
`;

export const DetailsButton = styled.button`
  ${({ theme }) => css`
    ${genericButtonStyles}

    background-color: ${theme.palette.secondary.contrast};
    border: 1px solid ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.main};

    &:hover {
      background-color: ${theme.palette.secondary.main};
      color: ${theme.palette.secondary.contrast};
    }
  `}
`;

export const ConfirmButton = styled.button`
  ${genericButtonStyles}

  background-color: darkgreen;
  border: 1px solid darkgreen;
  color: white;

  &:hover {
    background-color: green;
    border: 1px solid green;
  }
`;

export const DeleteButton = styled.button`
  ${({ theme }) => css`
    ${genericButtonStyles}

    background-color: ${theme.palette.error.dark};
    border: 1px solid ${theme.palette.error.dark};
    color: ${theme.palette.error.contrast};

    &:hover {
      background-color: ${theme.palette.error.main};
      border: 1px solid ${theme.palette.error.main};
    }
  `}
`;
