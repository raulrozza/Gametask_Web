import styled, { css } from 'styled-components';
import ErrorField from 'shared/view/components/ErrorField';

interface ContainerProps {
  $fullWidth: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, $fullWidth }) => css`
    width: ${$fullWidth ? '100%' : '240px'};

    margin-bottom: ${theme.layout.spacing(1)};
  `}
`;

interface LabelProps {
  thumbnail: string | null;
}

export const Label = styled.label<LabelProps>`
  margin: 0 auto;
  border: 1px dashed ${({ theme }) => theme.palette.gray[500]};
  border-radius: 50%;

  background-size: cover;
  cursor: pointer;

  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  input {
    display: none;
  }

  &:hover button {
    visibility: visible;
  }

  ${({ thumbnail }) =>
    thumbnail &&
    css`
      border: 0;
      background-image: url(${thumbnail});

      img {
        display: none;
      }
    `}
`;

export const PlaceholderImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ErrorMessage = styled(ErrorField)`
  margin-top: ${({ theme }) => theme.layout.spacing(1)};
  border-radius: ${({ theme }) => theme.layout.borderRadius.small};
  padding: ${({ theme }) => theme.layout.spacing(0.5, 1)};
`;
