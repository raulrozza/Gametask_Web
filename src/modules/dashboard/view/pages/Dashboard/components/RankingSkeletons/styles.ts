import styled from 'styled-components';

export const ListRank = styled.li`
  display: flex;
  align-items: center;

  height: 30px;
`;

export const PointsColumn = styled.div`
  width: 30%;

  padding-right: ${({ theme }) => theme.layout.spacing(1)};
`;

export const PlayerNameColumn = styled.div`
  width: 65%;
`;
