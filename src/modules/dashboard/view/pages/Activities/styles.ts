import styled from 'styled-components';

export const ActivityContainer = styled.div`
  flex: 1;
  width: 100%;

  padding: ${({ theme }) => theme.layout.spacing(1)};

  display: grid;
  gap: ${({ theme }) => theme.layout.spacing(2)};

  grid-template-columns: repeat(auto-fill, minmax(100px, 150px));
  grid-template-rows: repeat(auto-fill, 200px);
`;
