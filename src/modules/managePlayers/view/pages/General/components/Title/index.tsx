import React, {
  useState,
  useCallback,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';

// Hooks
import useEditTitlesController from 'modules/managePlayers/infra/controllers/useEditTitlesController';

// Icons
import { FaTrashAlt } from 'react-icons/fa';

// Styles
import { Container, DeleteButton, Input } from './styles';

// Types
import ITitle from 'modules/managePlayers/entities/ITitle';

interface TitleProps {
  title: ITitle;
  deleteTitle: (id: string) => void;
}

const Title: React.FC<TitleProps> = ({ title, deleteTitle }) => {
  const [name, setName] = useState(title.name);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { loading, editTitle } = useEditTitlesController();

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

        const payload = {
          id: title.id,
          name,
        };

        await editTitle(payload);
      }
    },
    [editTitle, editing, name, title.id],
  );

  const handleDelete = useCallback(async () => deleteTitle(title.id), [
    deleteTitle,
    title.id,
  ]);

  return (
    <Container>
      <Input
        ref={inputRef}
        type="text"
        value={name}
        disabled={loading}
        onChange={event => setName(event.target.value)}
        onClick={enableEditing}
        onKeyUp={handleFinishEditing}
        readOnly={!editing || loading}
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
