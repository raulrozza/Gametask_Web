import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    max-width: 600px;
    width: 100%;
  }

  h1 {
    margin-top: 10px;
    text-align: center;
  }

  svg {
    margin: 0 auto;
    display: block;
    font-size: 60px;
  }
`;
