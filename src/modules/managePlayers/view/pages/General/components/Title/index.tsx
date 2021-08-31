import React, {
  useState,
  useCallback,
  KeyboardEvent,
  useRef,
  useEffect,
} from 'react';

// Hooks
import { FaTrashAlt } from 'react-icons/fa';

import ITitle from 'modules/managePlayers/domain/entities/ITitle';
import useEditTitlesController from 'modules/managePlayers/infra/controllers/useEditTitlesController';

// Icons

// Styles
import { Container, DeleteButton, Input } from './styles';

// Types

interface TitleProps {
  title: ITitle;
  deleteTitle: (id: string) => void;
}

const Title: React.FC<TitleProps> = ({ title, deleteTitle }) => {
  const [name, setName] = useState(title.name);
  const [editing, setEditing] = useState(false);

  const isDeleteButtonHovered = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const { loading, editTitle } = useEditTitlesController();

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.addEventListener('blur', () => {
        if (!isDeleteButtonHovered.current) setEditing(false);
      });

    if (deleteButtonRef.current) {
      deleteButtonRef.current.addEventListener(
        'mouseenter',
        () => (isDeleteButtonHovered.current = true),
      );
      deleteButtonRef.current.addEventListener(
        'mouseleave',
        () => (isDeleteButtonHovered.current = false),
      );
    }
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

  const handleDelete = useCallback(async () => {
    deleteTitle(title.id);
    setEditing(false);
  }, [deleteTitle, title.id]);

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
        ref={deleteButtonRef}
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
