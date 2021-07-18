import styled from 'styled-components';

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

  object-fit: cover;
  object-position: top;
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
