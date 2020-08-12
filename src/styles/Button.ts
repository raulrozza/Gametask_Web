import styled, { css } from 'styled-components';

const Button = styled.button`
  ${({ theme }) => css`
    cursor: pointer;
    background-color: ${theme.secondary};
    color: ${theme.secondaryContrast};
    border: none;
    border-radius: 2px;
    line-height: 24px;
    font-size: 16px;
    padding: 8px 12px;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: var(--secondary-shade);
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  `}
`;

export default Button;
