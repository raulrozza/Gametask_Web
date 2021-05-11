import styled, { css } from 'styled-components';

export const Container = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.palette.gray[100]};
    color: ${theme.palette.primary.contrast};

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: ${theme.layout.spacing(3, 0)};
  `}
`;

export const GameTaskTitle = styled.div`
  ${({ theme }) => css`
    cursor: default;

    margin-bottom: ${theme.layout.spacing(5)};
    padding: ${theme.layout.spacing(2, 4)};

    background: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.contrast};

    border-radius: ${theme.layout.borderRadius.medium};

    text-align: center;
  `}
`;

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.palette.primary.main};
    display: flex;
    flex-direction: row;

    border-radius: ${theme.layout.borderRadius.medium};

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `}
`;

interface FormToggleButtonProps {
  active: boolean;
}

export const FormToggle = {
  Container: styled.div`
    display: none;

    @media (max-width: 768px) {
      width: 100%;
      display: flex;
    }
  `,
  Button: styled.button<FormToggleButtonProps>`
    ${({ active, theme }) => css`
      cursor: pointer;

      width: 50%;

      ${active
        ? css`
            background-color: ${theme.palette.primary.main};
            color: ${theme.palette.secondary.light};
          `
        : css`
            background-color: ${theme.palette.secondary.main};
            color: ${theme.palette.secondary.contrast};
          `}

      border: none;

      line-height: 24px;
      font-size: 16px;
      font-weight: bold;
      padding: 8px 12px;
      transition: all 0.2s;

      &:hover {
        background-color: ${theme.palette.secondary.dark};
        color: ${theme.palette.secondary.contrast};
      }
    `}
  `,
};
