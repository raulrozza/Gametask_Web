import React, { useState, useEffect } from 'react';

// Components
import { FaEdit, FaTimes, FaPlus } from 'react-icons/fa';

// Contexts
import { useAuth } from '../../contexts/Authorization';
import { IActivity } from 'game';

// Custom components
import ActivityForm from '../../components/Activities/ActivityForm';
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Services
import api from '../../services/api';

// Utils
import {
  addItemToArray,
  updateItemInArray,
  removeItemFromArray,
} from '../../utils/arrayMethods';

import './styles.css';

interface ISubmitProps {
  activityId: string;
  type: 'create' | 'update';
}

type ISubmit = (props: ISubmitProps) => void;

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

  const createActivity = () => {
    setSelectedActivity(null);
    setShowPanel(true);
  };

  const editActivity = (id: string) => {
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
  };

  const deleteActivity = async (id: string) => {
    const response = window.confirm(
      'Deseja mesmo excluir esta atividade? Esta ação não pode ser desfeita.',
    );
    if (response) {
      setLoading(true);
      try {
        await api.delete(`/activity/${id}`);

        const index = activities.findIndex(item => item._id === id);
        setActivities(removeItemFromArray(activities, index));
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/activities');

        setActivities(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          console.error(data);

          if (data.error === 'TokenExpiredError: jwt expired') {
            signOut();
          }
        }
        console.error(error);
      }
    })();
  }, [signOut]);

  const onSubmit: ISubmit = async ({ activityId, type }) => {
    switch (type) {
      case 'create':
        setActivities(addItemToArray(activities, activityId));
        setShowPanel(false);
        break;
      case 'update':
        try {
          const { data } = await api.get(`/activity/${activityId}`);

          const index = activities.findIndex(item => item._id === activityId);
          setActivities(updateItemInArray(activities, data, index));
          setShowPanel(false);
        } catch (error) {
          console.error(error);
        }
        break;
      default:
    }
  };

  return (
    <PageWrapper title="Atividades">
      {!loading ? (
        <>
          <div className="row">
            <div className={`${showPanel ? 'reduced' : ''}`}>
              <div className={`activity-container`}>
                {activities.map(activity => (
                  <div
                    key={activity._id}
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
                    <button
                      className="delete-button"
                      title="Excluir conquista"
                      onClick={() => deleteActivity(activity._id)}
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="edit-button"
                      title="Editar conquista"
                      onClick={() => editActivity(activity._id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={`editor ${showPanel ? 'shown' : ''}`}>
              <ActivityForm
                activity={selectedActivity}
                submitCallback={onSubmit}
              />
            </div>
          </div>
          <footer className="footer">
            <button onClick={createActivity}>
              <span>Nova Atividade</span>
              <span className="plus-icon">
                <FaPlus />
              </span>
            </button>
          </footer>
        </>
      ) : (
        <div className="loader">
          <Loading />
        </div>
      )}
    </PageWrapper>
  );
};

export default Activities;