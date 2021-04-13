import styled, { css } from 'styled-components';
import Box from '../Box';

interface ContainerProps {
  $expanded: boolean;
}

const Container = styled.div<ContainerProps>`
  display: grid;
  overflow-y: hidden;
  transition: all 0.5s;

  ${({ $expanded }) =>
    $expanded &&
    css`
      max-height: 2000px !important;
    `}
`;

const Footer = styled.footer`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.palette.primary.dark};
    margin-top: ${theme.layout.spacing(2)};
    padding-top: ${theme.layout.spacing(1)};

    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    svg {
      cursor: pointer;
      color: ${theme.palette.primary.dark};
      position: absolute;
      right: 0px;
    }
  `}
`;

const ExpandableBox = {
  Box: styled(Box)`
    width: 600px;
    max-width: calc(100% - 16px);
  `,
  Container,
  Footer,
};

export const EmptyBoxMessage = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.layout.spacing(4, 2)};
  text-align: center;
  font-size: 14px;

  a {
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    width: 240px;
  }
`;

export default ExpandableBox;
