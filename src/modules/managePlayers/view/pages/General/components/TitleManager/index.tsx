import React from 'react';

// Components
import { Loading } from 'components';
import { Title } from '..';

// Hooks
import { useTitle } from './hooks';

// Icons
import { FaPlus } from 'react-icons/fa';

// Styles
import { Container, NoTitles } from './styles';

const TitleManager: React.FC = () => {
  const { titles, loading, handleAddTitle, deleteCallback } = useTitle();

  return (
    <Container>
      <header>
        <h3>Gerenciar Títulos</h3>

        <button type="button" title="Adicionar título" onClick={handleAddTitle}>
          <FaPlus />
        </button>
      </header>
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {titles.map(title => (
            <Title key={title._id} title={title} onDelete={deleteCallback} />
          ))}

          {titles.length === 0 && (
            <NoTitles>Não há nenhum título cadastrado.</NoTitles>
          )}
        </ul>
      )}
    </Container>
  );
};

export default TitleManager;
