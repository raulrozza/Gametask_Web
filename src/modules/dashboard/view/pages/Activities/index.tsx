import React, { useState, useCallback } from 'react';

// Components
import { Button } from 'shared/view/components';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import Modal, { useModalController } from 'shared/view/components/Modal';
import { ActivityEditor } from './components';
import { FaEdit, FaTimes } from 'react-icons/fa';

// Hooks
import useFetchActivitiesController from 'modules/dashboard/infra/controllers/useFetchActivitiesController';

// Styles
import { ActivityContainer } from './styles';
import { RemoveButton } from 'styles';

// Types
import { IActivity } from 'interfaces/api/Activity';
import { useItemEditorController } from 'modules/dashboard/view/hooks';

const Activities: React.FC = () => {
  const {
    activities,
    loading,
    fetchActivities,
  } = useFetchActivitiesController();

  const editorController = useItemEditorController();

  // Edit panel
  const [showPanel, setShowPanel] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null,
  );

  const createActivity = useCallback(() => {
    setSelectedActivity(null);
    setShowPanel(true);
  }, []);

  const editActivity = useCallback((id: string) => {
    /* const activity = activities.find(activity => activity._id === id);

      if (activity) {
        if (
          showPanel &&
          (!selectedActivity || activity._id !== selectedActivity._id)
        ) {
          setSelectedActivity(activity);
          return;
        }
        setSelectedActivity(activity);
        setShowPanel(!showPanel);
      } */
  }, []);

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

  const onSubmit = useCallback(async (id: string) => {
    /* try {
      const { data } = await api.instance.get(`/activity/${id}`);

      setActivities(activities => {
        const index = activities.findIndex(item => item._id === id);

        if (index === -1) return addItemToArray(activities, data);

        return updateItemInArray(activities, data, index);
      });

      setShowPanel(false);
    } catch (error) {
      handleApiErrors(error);
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
                  <div
                    key={activity.id}
                    className={`activity ${
                      !activity.description && !activity.dmRules ? 'center' : ''
                    }`}
                  >
                    <div className="activity-xp">{activity.experience} XP</div>

                    <div className="activity-name">{activity.name}</div>

                    {activity.description && (
                      <div className="activity-description">
                        {activity.description}
                      </div>
                    )}

                    {activity.dmRules && (
                      <div className="activity-rules">
                        Regras: <cite>{activity.dmRules}</cite>
                      </div>
                    )}

                    <RemoveButton
                      horizontalPosition="right"
                      title="Excluir conquista"
                      onClick={() => deleteActivity(activity.id)}
                    >
                      <FaTimes />
                    </RemoveButton>

                    <button
                      className="edit-button"
                      title="Editar conquista"
                      onClick={() => editActivity(activity.id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                ))}
              </ActivityContainer>
            )}

            <ActivityEditor
              visible={editorController.visible}
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
