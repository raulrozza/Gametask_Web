import RequestsContainer from 'modules/managePlayers/view/pages/General/components/RequestsContainer';
import styled from 'styled-components';

export const SRequestsContainer = styled(RequestsContainer)`
  width: 320px;
`;

export const RequestItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.layout.spacing(1)};
`;

export const Grid = styled.section`
  display: flex;
  margin-bottom: ${({ theme }) => theme.layout.spacing(1)};

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.layout.spacing(2)};
`;

export const Title = styled.span`
  strong {
    text-transform: capitalize;
  }
`;

export const Info = styled.span`
  font-size: 14px;
  margin-top: ${({ theme }) => theme.layout.spacing(1)};
`;
