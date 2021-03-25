import React, { useCallback, useState } from 'react';

// Components
import { Button, Loading, Modal, Row } from 'shared/view/components';
import { Title } from '..';

// Hooks
import { useModalController } from 'shared/view/components/Modal';
import useDeleteTitlesController from 'modules/managePlayers/infra/controllers/useDeleteTitlesController';
import useCreateNewTitleController from 'modules/managePlayers/infra/controllers/useCreateNewTitleController';
import useFetchTitlesController from 'modules/managePlayers/infra/controllers/useFetchTitlesController';

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
  const { createTitle } = useCreateNewTitleController();
  const { loading: loadingDelete, deleteTitle } = useDeleteTitlesController();

  const [selectedTitleId, setSelectedTitleId] = useState('');

  const [modalOpen, handleOpenModal, handleCloseModal] = useModalController();

  const onClickDeleteTitle = useCallback(
    (id: string) => {
      setSelectedTitleId(id);
      handleOpenModal();
    },
    [handleOpenModal],
  );

  const handleDeleteTitle = useCallback(async () => {
    const success = await deleteTitle(selectedTitleId);

    if (success) fetchTitles();

    handleCloseModal();
  }, [deleteTitle, fetchTitles, handleCloseModal, selectedTitleId]);

  return (
    <Container>
      <Header>
        <h3>Gerenciar Títulos</h3>

        <AddTitleButton
          type="button"
          title="Adicionar título"
          onClick={createTitle}
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
              deleteTitle={onClickDeleteTitle}
            />
          ))}

          {titles.length === 0 && (
            <NoTitles>Não há nenhum título cadastrado.</NoTitles>
          )}
        </TitleList>
      )}

      <Modal
        closeModal={handleCloseModal}
        open={modalOpen}
        size="sm"
        title="Confirmação Necessária"
      >
        Deseja realmente excluir este título?
        <Row>
          <Button outlined onClick={handleCloseModal}>
            Cancelar
          </Button>

          <Button onClick={handleDeleteTitle} loading={loadingDelete}>
            Confirmar
          </Button>
        </Row>
      </Modal>
    </Container>
  );
};

export default TitleManager;
