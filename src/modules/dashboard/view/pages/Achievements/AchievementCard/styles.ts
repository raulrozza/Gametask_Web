import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100px;
  padding: 5px;
  background: ${({ theme }) => theme.palette.primary.dark};
  box-shadow: 0px 0px 0px 0px ${({ theme }) => theme.palette.primary.dark};
  border-radius: 10px;
  text-align: center;
  transition: all 0.5s;
  position: relative;

  button {
    visibility: hidden;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.contrast};
    box-shadow: 0px 0px 3px 2px ${({ theme }) => theme.palette.primary.dark};

    button {
      visibility: visible;
    }
  }

  .achievement-image {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
    border-radius: 50%;
  }

  .achievement-name {
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    min-height: 20px;
    width: inherit;
    text-align: center;

    .title {
      color: ${({ theme }) => theme.palette.secondary.light};
    }
  }

  .achievement-description {
    font-size: 14px;
  }

  .edit-button {
    position: absolute;
    bottom: 2px;
    right: 2px;
    color: ${({ theme }) => theme.palette.primary.dark};
    font-size: 16px;
    border: none;
    background-color: transparent;
    margin-left: 2px;
    cursor: pointer;
  }
`;
