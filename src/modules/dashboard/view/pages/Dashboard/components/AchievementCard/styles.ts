import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    width: 80px;
    padding: ${theme.layout.spacing(1)};

    .image {
      width: 80px;
      height: 80px;
      margin-bottom: ${theme.layout.spacing(1)};
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
    }

    .name {
      font-size: 12px;
      font-weight: bold;
      line-height: 20px;
      height: 20px;
      width: inherit;
      text-align: center;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  `}
`;
