import styled, { css } from 'styled-components';

const ErrorField = styled.div`
  ${({ theme }) => css`
    background-color: rgb(253, 57, 57);
    color: #fff;

    padding: ${theme.layout.spacing(2, 1, 0.5)};
    font-size: 12px;
    margin-top: ${theme.layout.spacing(-1)};
    margin-bottom: ${theme.layout.spacing(2)};
    border-radius: 0px 0px ${theme.layout.borderRadius.small}
      ${theme.layout.borderRadius.small};
  `}
`;

export default ErrorField;
