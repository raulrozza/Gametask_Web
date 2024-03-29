import React, { useCallback, useState } from 'react';

import IAchievement from 'modules/dashboard/domain/entities/IAchievement';
import useDeleteAchievementController from 'modules/dashboard/infra/controllers/useDeleteAchievementController';
import useFetchAchievementsController from 'modules/dashboard/infra/controllers/useFetchAchievementsController';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import { useItemEditorController } from 'modules/dashboard/view/hooks';
import { useEditAchievementSelector } from 'modules/dashboard/view/pages/Achievements/hooks';
import { Button, Row } from 'shared/view/components';
import Modal, { useModalController } from 'shared/view/components/Modal';

import { AchievementCard, AchievementEditor } from './components';
import { AchievementsContainer } from './styles';

const Achievements: React.FC = () => {
  const {
    achievements,
    loading,
    fetchAchievements,
  } = useFetchAchievementsController();

  const editorController = useItemEditorController();

  const { achievementValues, openEditorWith } = useEditAchievementSelector();
  const {
    loading: loadingDelete,
    deleteAchievement,
  } = useDeleteAchievementController();

  const [selectedAchievementId, setSelectedAchievementId] = useState('');

  const [modalOpen, openModal, closeModal] = useModalController();

  const handleOpenRemoveAchievementModal = useCallback(
    (id: string) => {
      setSelectedAchievementId(id);
      openModal();
    },
    [openModal],
  );

  const handleRemoveAchievement = useCallback(async () => {
    await deleteAchievement(selectedAchievementId);
    closeModal();
    fetchAchievements();
  }, [closeModal, deleteAchievement, fetchAchievements, selectedAchievementId]);

  const handleOpenEditorWith = useCallback(
    (achievement?: IAchievement) => {
      const isTheAlreadySelectedAchievement =
        achievement &&
        achievementValues &&
        achievement.id === achievementValues.id;

      if (isTheAlreadySelectedAchievement) return editorController.toggle();

      openEditorWith(achievement);
      editorController.open();
    },
    [achievementValues, editorController, openEditorWith],
  );

  return (
    <DefaultPageContainer title="Conquistas">
      {loading ? (
        <DefaultPageLoading />
      ) : (
        <>
          <DefaultPageContainer.Content>
            {achievements.length === 0 ? (
              <DefaultPageContainer.EmptyContent>
                Não há conquistas ainda.
              </DefaultPageContainer.EmptyContent>
            ) : (
              <AchievementsContainer>
                {achievements.map(achievement => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    openEditorWith={handleOpenEditorWith}
                    removeAchievement={handleOpenRemoveAchievementModal}
                  />
                ))}
              </AchievementsContainer>
            )}

            <AchievementEditor
              visible={editorController.visible}
              closeEditor={editorController.close}
              updateAchievements={fetchAchievements}
              initialValues={achievementValues}
            />
          </DefaultPageContainer.Content>

          <DefaultPageContainer.Footer>
            <Button onClick={() => handleOpenEditorWith()}>
              Nova Conquista
            </Button>
          </DefaultPageContainer.Footer>
        </>
      )}

      <Modal
        title="Confirmação necessária"
        closeModal={closeModal}
        open={modalOpen}
        size="sm"
      >
        Deseja realmente excluir esta conquista?
        <Row>
          <Button outlined onClick={closeModal}>
            Cancelar
          </Button>

          <Button onClick={handleRemoveAchievement} loading={loadingDelete}>
            Confirmar
          </Button>
        </Row>
      </Modal>
    </DefaultPageContainer>
  );
};

export default Achievements;
