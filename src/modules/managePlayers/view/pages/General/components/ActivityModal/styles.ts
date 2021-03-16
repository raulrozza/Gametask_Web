import styled from 'styled-components';

export const ModalContainer = styled.div`
  padding: 8px;

  header {
    display: grid;
    grid-template-areas:
      'image title'
      'image description';
    grid-template-columns: 1fr 3fr;
    gap: 8px;
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
  }

  section {
    display: grid;
    grid-template-areas:
      '. .'
      'rules rules';
    grid-template-columns: 1fr 2fr;
    margin: 16px 0;

    cite {
      grid-area: rules;
    }
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
