import styled, { css } from 'styled-components';

export const Main = styled.main`
  background-color: ${({ theme }) => theme.palette.primary.dark};
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .column {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.contrast};
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;

export const MinMaxBox = styled(InfoBox)`
  ${({ theme }) => css`
    .container {
      display: grid;
      overflow-y: hidden;
      transition: all 0.5s;

      &.maximized {
        max-height: 2000px;
      }
    }

    .no-data {
      width: 480px;
      padding: 16px 8px;
      text-align: center;
      font-size: 14px;

      a {
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }

      @media (max-width: 768px) {
        width: 240px;
      }
    }

    .min-max {
      border-top: 1px solid ${theme.palette.primary.dark};
      margin-top: 8px;
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 5px;
      font-size: 14px;

      svg {
        cursor: pointer;
        color: ${theme.palette.primary.dark};
        position: absolute;
        right: 0px;
      }
    }
  `}
`;
