import React, { useState, useEffect, useCallback } from 'react';

// Components
import { Button } from 'shared/view/components';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import Modal, { useModalController } from 'shared/view/components/Modal';
import { FaEdit, FaTimes } from 'react-icons/fa';
import ActivityForm from './ActivityForm';

// Hooks
import { useAuth } from 'hooks/contexts/useAuth';

// Services
import { api } from 'services';

// Styles
import { Container } from './styles';
import { RemoveButton } from 'styles';
import { EmptyContainer, Editor, Row } from 'components/PageWrapper/styles';

// Utils
import {
  addItemToArray,
  updateItemInArray,
  removeItemFromArray,
} from 'utils/arrayMethods';
import handleApiErrors from 'utils/handleApiErrors';

// Types
import { IActivity } from 'interfaces/api/Activity';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);
  // Edit panel
  const [showPanel, setShowPanel] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null,
  );
  // Context
  const { signOut } = useAuth();

  const createActivity = useCallback(() => {
    setSelectedActivity(null);
    setShowPanel(true);
  }, []);

  const editActivity = useCallback(
    (id: string) => {
      const activity = activities.find(activity => activity._id === id);

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
      }
    },
    [activities, showPanel, selectedActivity],
  );

  const deleteActivity = useCallback(async (id: string) => {
    const response = window.confirm(
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
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.instance.get('/activity');

        setActivities(data);
        setLoading(false);
      } catch (error) {
        handleApiErrors(error, signOut);
      }
    })();
  }, [signOut]);

  const onSubmit = useCallback(async (id: string) => {
    try {
      const { data } = await api.instance.get(`/activity/${id}`);

      setActivities(activities => {
        const index = activities.findIndex(item => item._id === id);

        if (index === -1) return addItemToArray(activities, data);

        return updateItemInArray(activities, data, index);
      });

      setShowPanel(false);
    } catch (error) {
      handleApiErrors(error);
    }
  }, []);

  return (
    <DefaultPageContainer title="Atividades">
      {loading ? (
        <DefaultPageLoading />
      ) : (
        <>
          <Row reduced={showPanel}>
            {activities.length > 0 ? (
              <div>
                <Container reduced={showPanel}>
                  {activities.map(activity => (
                    <div
                      key={activity._id}
                      className={`activity ${
                        !activity.description && !activity.dmRules
                          ? 'center'
                          : ''
                      }`}
                    >
                      <div className="activity-xp">
                        {activity.experience} XP
                      </div>

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
                        onClick={() => deleteActivity(activity._id)}
                      >
                        <FaTimes />
                      </RemoveButton>

                      <button
                        className="edit-button"
                        title="Editar conquista"
                        onClick={() => editActivity(activity._id)}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  ))}
                </Container>
              </div>
            ) : (
              <EmptyContainer reduced={showPanel}>
                Não há nenhuma atividade ainda.
              </EmptyContainer>
            )}

            <Editor shown={showPanel}>
              <ActivityForm
                activity={selectedActivity}
                submitCallback={onSubmit}
              />
            </Editor>
          </Row>

          <DefaultPageContainer.Footer>
            <Button onClick={createActivity}>Nova Atividade</Button>
          </DefaultPageContainer.Footer>
        </>
      )}
    </DefaultPageContainer>
  );
};

export default Activities;