import React, { useCallback } from 'react';

// Components
import { Loading } from 'shared/view/components';
import { Title } from '..';

// Hooks
import useFetchTitlesController from 'modules/managePlayers/infra/controllers/useFetchTitlesController';
import { useTitle } from './hooks';

// Icons
import { FaPlus } from 'react-icons/fa';

// Styles
import {
  AddTitleButton,
  Container,
  Header,
  NoTitles,
  TitleList,
} from './styles';

const TitleManager: React.FC = () => {
  const { loading, titles, fetchTitles } = useFetchTitlesController();
  const { handleAddTitle } = useTitle();

  const handleDeleteTitle = useCallback(() => undefined, []);

  return (
    <Container>
      <Header>
        <h3>Gerenciar Títulos</h3>

        <AddTitleButton
          type="button"
          title="Adicionar título"
          onClick={handleAddTitle}
        >
          <FaPlus />
        </AddTitleButton>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <TitleList>
          {titles.map(title => (
            <Title
              key={title.id}
              title={title}
              deleteTitle={handleDeleteTitle}
            />
          ))}

          {titles.length === 0 && (
            <NoTitles>Não há nenhum título cadastrado.</NoTitles>
          )}
        </TitleList>
      )}
    </Container>
  );
};

export default TitleManager;
