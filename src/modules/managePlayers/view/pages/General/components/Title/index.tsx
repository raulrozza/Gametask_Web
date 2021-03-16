import React, {
  useState,
  useCallback,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';

// Icons
import { FaTrashAlt } from 'react-icons/fa';

// Styles
import { Container, DeleteButton, Input } from './styles';

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.addEventListener('blur', () => setEditing(false));
  }, []);

  const enableEditing = useCallback(() => setEditing(true), []);

  const handleFinishEditing = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      if (!editing) return;

      if (event.key === 'Enter') {
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
    <Container>
      <Input
        ref={inputRef}
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
        onClick={enableEditing}
        onKeyUp={handleFinishEditing}
        readOnly={!editing}
        editing={editing}
      />

      <DeleteButton
        title="Excluir título"
        editing={editing}
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </DeleteButton>
    </Container>
  );
};

export default Title;
