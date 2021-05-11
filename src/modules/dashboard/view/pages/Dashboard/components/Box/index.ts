import styled, { css } from 'styled-components';

const Box = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    padding: ${theme.layout.spacing(2)};
    margin: ${theme.layout.spacing(2)};
    border-radius: ${theme.layout.borderRadius.medium};
  `}
`;

export default Box;
