import RequestFooter from 'modules/managePlayers/view/pages/General/components/RequestFooter';
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.layout.spacing(2)};
`;

export const UserInfo = styled.header`
  display: grid;
  grid-template-areas:
    'image title'
    'image description';
  grid-template-columns: 1fr 3fr;
  gap: ${({ theme }) => theme.layout.spacing(2)};
  place-items: center;
  width: 100%;

  > img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    grid-area: image;
  }

  > strong {
    text-transform: capitalize;
    grid-area: title;
    font-size: 24px;
  }

  > span {
    grid-area: description;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    > img {
      height: 80px;
      width: 80px;
    }

    > strong {
      font-size: 18px;
    }

    > span {
      font-size: 14px;
    }
  }
`;

export const Divider = styled.hr`
  width: 100%;
  margin: ${({ theme }) => theme.layout.spacing(2, 0)};
  border-bottom: none;
  border-color: ${({ theme }) => theme.palette.gray['100']};
`;

export const DescriptionBlock = styled.section`
  display: grid;
  grid-template-areas:
    '. .'
    'rules rules';
  grid-template-columns: auto 1fr;
  margin: ${({ theme }) => theme.layout.spacing(4, 0)};

  span:nth-child(2) {
    margin-left: ${({ theme }) => theme.layout.spacing(2)};
  }

  cite {
    grid-area: rules;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
  }
`;

export const SRequestFooter = styled(RequestFooter)`
  button {
    width: 48px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
