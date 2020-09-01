import styled from 'styled-components';

export const ModalContainer = styled.div`
  padding: 8px;

  header {
    display: grid;
    grid-template-areas:
      'user-image achievement-image title'
      'user-image description description'
      'user-image obtained-by obtained-by';
    grid-template-columns: 1fr 1fr 3fr;
    gap: 8px;
    place-items: center;
    width: 100%;

    .user-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      grid-area: user-image;
    }

    .achievement-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      grid-area: achievement-image;
    }

    > strong {
      justify-self: left;
      text-transform: capitalize;
      grid-area: title;
      font-size: 24px;
    }

    .description {
      grid-area: description;
    }

    .obtained-by {
      grid-area: obtained-by;
    }
  }

  section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin: 16px 0;
  }

  footer {
    cite {
      font-size: 14px;
      margin-right: 4px;
    }

    button {
      width: 48px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    header {
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
  }

  @media (max-width: 576px) {
    section {
      display: flex;
      flex-direction: column;
    }
  }
`;
