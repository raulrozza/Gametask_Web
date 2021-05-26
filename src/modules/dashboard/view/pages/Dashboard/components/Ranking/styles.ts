import { getContrastColor } from 'modules/dashboard/view/helpers';
import Box from 'modules/dashboard/view/pages/Dashboard/components/Box';
import { Button } from 'shared/view/components';
import styled, { css } from 'styled-components';

export const Container = styled(Box)`
  width: 100%;
  max-width: 330px;
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.palette.primary.dark};
    margin-top: ${theme.layout.spacing(2)};
    padding-top: ${theme.layout.spacing(1)};

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
  `}
`;

export const List = styled.ul`
  list-style: none;
`;

const listCommonCss = css`
  ${({ theme }) => css`
    margin-bottom: ${theme.layout.spacing(1)};
    display: flex;
    align-items: center;

    height: 30px;
  `}
`;

export const ListTitle = styled.li`
  ${({ theme }) => css`
    ${listCommonCss}
    justify-content: space-between;

    font-weight: bold;
    border-bottom: 1px solid ${theme.palette.primary.dark};
    font-family: ${theme.typography.family.title};
  `}
`;

export const ListRank = styled.li`
  ${listCommonCss}

  justify-content: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  font-size: 14px;
`;

export const PointsTitle = styled.div`
  width: 30%;
`;

export const PointsLabel = styled.div`
  width: 30%;

  height: 100%;
  display: flex;
  align-items: center;
`;

export const PlayerNameColumn = styled.div`
  width: 65%;
`;

export const RegistersBox = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.secondary.dark};
    color: ${theme.palette.secondary.contrast};

    height: 20px;
    padding: ${theme.layout.spacing(1)};
    border-radius: ${theme.layout.spacing(1)};

    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

interface RankBoxProps {
  color: string;
}

export const RankBox = styled.div<RankBoxProps>`
  ${({ theme, color }) => css`
    padding: ${theme.layout.spacing(1)};
    margin-right: ${theme.layout.spacing(1)};

    border-radius: ${theme.layout.borderRadius.small};

    display: inline-block;

    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    font-family: ${theme.typography.family.title};

    background-color: ${color};
    color: ${getContrastColor(color)};
  `}
`;

export const EmptyLeaderboard = styled.span`
  ${({ theme }) => css`
    display: flex;
    height: 60px;
    align-items: center;
    font-size: 14px;
    justify-content: center;
    text-decoration: underline;
    color: ${theme.palette.secondary.main};

    svg {
      margin-left: ${theme.layout.spacing(1)};
    }
  `}
`;

export const ResetButton = styled(Button)`
  align-self: center;

  margin-top: ${({ theme }) => theme.layout.spacing(2)};
  padding: ${({ theme }) => theme.layout.spacing(1, 2)};

  span {
    font-size: 12px;
  }
`;

export const ModalText = styled.p`
  margin-top: ${({ theme }) => theme.layout.spacing(1)};

  text-align: center;
`;
