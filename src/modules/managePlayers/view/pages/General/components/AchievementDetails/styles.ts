import RequestFooter from 'modules/managePlayers/view/pages/General/components/RequestFooter';
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.layout.spacing(2)};

  section {
    display: grid;
    grid-template-columns: auto 3fr;
    margin: ${({ theme }) => theme.layout.spacing(4, 0)};

    gap: ${({ theme }) => theme.layout.spacing(2)};
  }

  @media (max-width: 576px) {
    section {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const UserInfo = styled.header`
  display: grid;
  grid-template-areas:
    'user-image title achievement-image'
    'user-image description description'
    'user-image obtained-by obtained-by';
  grid-template-columns: auto 3fr auto;
  gap: ${({ theme }) => theme.layout.spacing(2)};
  place-items: center;
  width: 100%;

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

export const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  grid-area: user-image;
`;

export const AchievementImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  grid-area: achievement-image;
`;

export const Title = styled.strong`
  justify-self: left;
  text-transform: capitalize;
  grid-area: title;
  font-size: 24px;

  span {
    font-size: 20px;
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const Description = styled.span`
  justify-self: left;
  grid-area: description;
`;

export const ObtainedBy = styled.span`
  justify-self: left;
  grid-area: obtained-by;
  color: ${({ theme }) => theme.palette.secondary.main};
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
