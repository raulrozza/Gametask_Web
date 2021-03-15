import React, { useState, useCallback } from 'react';

// Components
import { Button } from 'shared/view/components';
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

  // Edit panel
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null,
  );

  const deleteActivity = useCallback(async (id: string) => {
    /* const response = window.confirm(
      'Deseja mesmo excluir esta atividade? Esta ação não pode ser desfeita.',
    );
    if (response) {
      setLoading(true);
      try {
        await api.instance.delete(`/activity/${id}`);

        setActivities(activities => {
          const index = activities.findIndex(item => item._id === id);

          return removeItemFromArray(activities, index);
        });
      } catch (error) {
        handleApiErrors(error);
      }

      setLoading(false);
    } */
  }, []);

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
                    removeActivity={() => undefined}
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
    </DefaultPageContainer>
  );
};

export default Activities;
