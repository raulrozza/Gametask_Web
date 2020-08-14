import styled, { css } from 'styled-components';
import { InputWrapperProps } from './types';

export const InputWrapper = styled.label<InputWrapperProps>`
  margin: 0 auto;
  border: 1px dashed #ddd;
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

  img {
    width: 100%;
    height: 100%;
  }

  button {
    position: absolute;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 18px;
    top: 15px;
    right: 15px;
    visibility: hidden;
    color: #aaa;
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
