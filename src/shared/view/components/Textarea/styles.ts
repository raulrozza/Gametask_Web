import styled, { css } from 'styled-components';

interface ContainerProps {
  $fullWidth: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, $fullWidth }) => css`
    width: ${$fullWidth ? '100%' : '240px'};

    margin-bottom: ${theme.layout.spacing(1)};
  `}
`;

export const TextareaField = styled.textarea`
  ${({ theme }) => css`
    width: 100%;
    min-height: 72px;

    background-color: ${theme.palette.primary.light};

    outline: 0;
    border: 1px solid ${theme.palette.gray[300]};
    border-radius: ${theme.layout.borderRadius.small};
    padding: ${theme.layout.spacing(0, 3)};

    line-height: 24px;
    font-size: 14px;

    transition: border-color 0.5s;

    resize: vertical;

    &:focus {
      border-color: ${theme.palette.secondary.main};
    }
  `}
`;
