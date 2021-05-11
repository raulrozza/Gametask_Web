import styled, {
  css,
  DefaultTheme,
  StyledComponent,
  StyledComponentBase,
} from 'styled-components';

interface IRequestsContainer extends StyledComponentBase<'div', DefaultTheme> {
  List: StyledComponent<'ul', DefaultTheme>;
}

const RequestsContainer: IRequestsContainer = (styled.div`
  ${({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    padding: ${theme.layout.spacing(2)};
    margin: ${theme.layout.spacing(2)};
    border-radius: ${theme.layout.borderRadius.medium};
    width: 480px;
    max-width: calc(100% - ${theme.layout.spacing(4)});

    @media (max-width: ${theme.layout.breakpoints.lg}) {
      width: calc(100% - ${theme.layout.spacing(4)});
    }
  `}
` as unknown) as IRequestsContainer;

RequestsContainer.List = styled.ul`
  list-style: none;
  max-height: 90vh;
  overflow-y: auto;
  scrollbar-width: thin;

  li + li {
    margin-top: ${({ theme }) => theme.layout.spacing(2)};
  }
`;

export default RequestsContainer;
