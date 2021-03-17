import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.layout.spacing(1, 4)};
  margin-top: ${({ theme }) => theme.layout.spacing(2)};
`;

export default Row;
