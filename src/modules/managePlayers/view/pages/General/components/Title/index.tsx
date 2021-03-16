import React, { useState, useCallback, KeyboardEvent } from 'react';

// Icons
import { FaTrashAlt } from 'react-icons/fa';

// Styles
import { Container } from './styles';

// Types
import ITitle from 'modules/managePlayers/entities/ITitle';

// Utils
import handleApiErrors from 'utils/handleApiErrors';
import { api } from 'services';

interface TitleProps {
  title: ITitle;
  onDelete: () => void;
}

const Title: React.FC<TitleProps> = ({ title, onDelete }) => {
  const [name, setName] = useState(title.name);
  const [editing, setEditing] = useState(false);

  const enableEditing = useCallback(() => {
    if (!editing) setEditing(true);
  }, [editing]);

  const handleFinishEditing = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      if (!editing) return;

      if (event.keyCode === 13) {
        setEditing(false);

        try {
          await api.instance.put(`/title/${title.id}`, { name });
        } catch (error) {
          handleApiErrors(error);
        }
      }
    },
    [editing, name, title],
  );

  const handleDelete = useCallback(async () => {
    if (window.confirm('Deseja mesmo excluir este título?'))
      try {
        await api.instance.delete(`/title/${title.id}`);

        onDelete();
      } catch (error) {
        handleApiErrors(error);
      }
  }, [onDelete, title.id]);

  return (
    <Container editing={editing}>
      <input
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
        onClick={enableEditing}
        onKeyUp={handleFinishEditing}
        readOnly={!editing}
      />

      <button title="Excluir título" onClick={handleDelete}>
        <FaTrashAlt />
      </button>
    </Container>
  );
};

export default Title;
