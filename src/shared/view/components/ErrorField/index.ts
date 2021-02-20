import styled, { css } from 'styled-components';

const ErrorField = styled.div`
  ${({ theme }) => css`
    background-color: rgb(253, 57, 57);
    color: #fff;

    padding: ${theme.layout.spacing(2, 1, 0.5)};
    font-size: 12px;
    margin-top: -5px;
    margin-bottom: 10px;
    border-radius: 0px 0px 5px 5px;
  `}
`;

export default ErrorField;
