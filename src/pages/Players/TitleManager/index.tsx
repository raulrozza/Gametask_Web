import React, { useState, useEffect, useCallback } from 'react';

// Components
import Loading from '../../../components/Loading';
import TitleElement from './TitleElement';

// Icons
import { FaPlus } from 'react-icons/fa';

// Services
import api from '../../../services/api';

// Styles
import { Container, NoTitles } from './styles';

// Types
import { ITitle } from 'game';

// Utils
import handleApiErrors from '../../../utils/handleApiErrors';
import {
  addItemToArray,
  removeItemFromArray,
} from '../../../utils/arrayMethods';

const TitleManager: React.FC = () => {
  const [titles, setTitles] = useState<ITitle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/title');

        setTitles(data);
      } catch (error) {
        handleApiErrors(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddTitle = useCallback(async () => {
    try {
      const { data } = await api.post('/title', { name: 'Novo título' });

      setTitles(titles => addItemToArray(titles, data));
    } catch (error) {
      handleApiErrors(error);
    }
  }, []);

  const deleteCallback = useCallback((id: string) => {
    setTitles(titles => {
      const index = titles.findIndex(title => title._id === id);

      return removeItemFromArray(titles, index);
    });
  }, []);

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
            <TitleElement
              key={title._id}
              title={title}
              onDelete={deleteCallback}
            />
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
