import styled, {
  DefaultTheme,
  StyledComponent,
  StyledComponentBase,
} from 'styled-components';
import { Form } from 'formik';

export const SForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${({ theme }) => theme.layout.spacing(3, 6)};
`;

interface IColorInputGroup extends StyledComponentBase<'div', DefaultTheme> {
  Column: StyledComponent<'div', DefaultTheme>;
  Row: StyledComponent<'div', DefaultTheme>;
}

export const ColorInputGroup = (styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.layout.spacing(1)};
` as unknown) as IColorInputGroup;

ColorInputGroup.Column = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${({ theme }) => theme.layout.spacing(1)};
  width: 200px;
`;

ColorInputGroup.Row = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.md}) {
    flex-direction: column;
  }
`;
