import React, { useState, useCallback } from 'react';

// Components
import { Button, Row } from 'shared/view/components';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import Modal, { useModalController } from 'shared/view/components/Modal';
import { ActivityCard, ActivityEditor } from './components';

// Hooks
import { useItemEditorController } from 'modules/dashboard/view/hooks';
import { useEditActivitySelector } from './hooks';
import useFetchActivitiesController from 'modules/dashboard/infra/controllers/useFetchActivitiesController';

// Styles
import { ActivityContainer } from './styles';
import IActivity from 'modules/dashboard/entities/IActivity';
import useDeleteActivityController from 'modules/dashboard/infra/controllers/useDeleteActivityController';

const Activities: React.FC = () => {
  const {
    activities,
    loading,
    fetchActivities,
  } = useFetchActivitiesController();

  const editorController = useItemEditorController();

  const { activityValues, openEditorWith } = useEditActivitySelector();

  const handleOpenEditorWith = useCallback(
    (activity?: IActivity) => {
      openEditorWith(activity);

      const isTheAlreadySelectedActivity =
        activity && activityValues && activity.id === activityValues.id;

      if (isTheAlreadySelectedActivity) return editorController.toggle();
      editorController.open();
    },
    [activityValues, editorController, openEditorWith],
  );

  const [selectedActivityId, setSelectedActivityId] = useState('');

  const [modalOpen, openModal, closeModal] = useModalController();

  const {
    loading: loadingDelete,
    deleteActivity,
  } = useDeleteActivityController();

  const handleOpenRemoveActivityModal = useCallback(
    (id: string) => {
      setSelectedActivityId(id);
      openModal();
    },
    [openModal],
  );

  const handleRemoveActivity = useCallback(async () => {
    await deleteActivity(selectedActivityId);
    closeModal();
    fetchActivities();
  }, [closeModal, deleteActivity, fetchActivities, selectedActivityId]);

  return (
    <DefaultPageContainer title="Atividades">
      {loading ? (
        <DefaultPageLoading />
      ) : (
        <>
          <DefaultPageContainer.Content>
            {activities.length === 0 ? (
              <DefaultPageContainer.EmptyContent>
                Não há nenhuma atividade ainda..
              </DefaultPageContainer.EmptyContent>
            ) : (
              <ActivityContainer>
                {activities.map(activity => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    openEditorWith={handleOpenEditorWith}
                    removeActivity={handleOpenRemoveActivityModal}
                  />
                ))}
              </ActivityContainer>
            )}

            <ActivityEditor
              visible={editorController.visible}
              initialValues={activityValues}
              closeEditor={editorController.close}
              updateActivities={fetchActivities}
            />
          </DefaultPageContainer.Content>

          <DefaultPageContainer.Footer>
            <Button onClick={editorController.open}>Nova Atividade</Button>
          </DefaultPageContainer.Footer>
        </>
      )}

      <Modal
        title="Confirmação necessária"
        closeModal={closeModal}
        open={modalOpen}
        size="sm"
      >
        Deseja realmente excluir esta atividade?
        <Row>
          <Button outlined onClick={closeModal}>
            Cancelar
          </Button>

          <Button onClick={handleRemoveActivity} loading={loadingDelete}>
            Confirmar
          </Button>
        </Row>
      </Modal>
    </DefaultPageContainer>
  );
};

export default Activities;
