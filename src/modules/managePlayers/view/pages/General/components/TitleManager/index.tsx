import React from 'react';

// Components
import { Loading } from 'shared/view/components';
import { Title } from '..';

// Hooks
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
  const { titles, loading, handleAddTitle, deleteCallback } = useTitle();

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
            <Title key={title._id} title={title} onDelete={deleteCallback} />
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
