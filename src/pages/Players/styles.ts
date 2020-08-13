import styled from 'styled-components';

export const PlayersContainer = styled.div`
  background-color: ${({ theme }) => theme.primaryLowShade};
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .back-button {
    position: fixed;
    top: 8px;
    left: 8px;
    font-size: 28px;
  }
`;
