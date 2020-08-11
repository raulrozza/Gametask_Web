import React, { useEffect, useState } from 'react';

// Assets
import placeholder from '../../assets/img/achievements/placeholder.png';

// Components
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

// Contexts
import { useAuth } from '../../contexts/Authorization';
import { IAchievement } from 'game';

// Custom components
import AchievementForm, {
  ISubmit,
} from '../../components/Achievements/AchievementForm';
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

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [
    selectedAchievement,
    setSelectedAchievement,
  ] = useState<IAchievement | null>(null);
  const [loading, setLoading] = useState(true);
  // Edit panel
  const [showPanel, setShowPanel] = useState(false);
  // Context
  const { signOut } = useAuth();

  const editAchievement = (id: string) => {
    const achievement = achievements.find(
      achievement => achievement._id === id,
    );

    if (achievement) {
      if (
        showPanel &&
        (!selectedAchievement || achievement._id !== selectedAchievement._id)
      ) {
        setSelectedAchievement({
          ...achievement,
          image: achievement.image ? achievement.image_url : undefined,
        });
        return;
      }
      setSelectedAchievement({
        ...achievement,
        image: achievement.image ? achievement.image_url : undefined,
      });
      setShowPanel(!showPanel);
    }
  };

  const createAchievement = () => {
    setSelectedAchievement(null);
    setShowPanel(true);
  };

  const deleteAchievement = async (id: string) => {
    const response = window.confirm(
      'Deseja mesmo excluir esta conquista? Esta ação não pode ser desfeita.',
    );
    if (response) {
      setLoading(true);
      try {
        await api.delete(`/achievement/${id}`);

        const index = achievements.findIndex(item => item._id === id);
        setAchievements(removeItemFromArray(achievements, index));
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/achievement');

        setAchievements(data);
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

  const onSubmit: ISubmit = async ({ achievementId, type }) => {
    switch (type) {
      case 'create':
        setAchievements(addItemToArray(achievements, achievementId));
        setShowPanel(false);
        break;
      case 'update':
        try {
          const { data } = await api.get(`/achievement/${achievementId}`);

          const index = achievements.findIndex(
            item => item._id === achievementId,
          );
          setAchievements(updateItemInArray(achievements, data, index));
          setShowPanel(false);
        } catch (error) {
          console.error(error);
        }
        break;
      default:
    }
  };

  return (
    <PageWrapper title="Conquistas">
      {!loading ? (
        <>
          <div className="row">
            <div className={`${showPanel ? 'reduced' : ''}`}>
              <div className={`achievement-container`}>
                {achievements.map(achievement => (
                  <div key={achievement._id} className="achievement">
                    <picture>
                      <source
                        srcSet={achievement.image && achievement.image_url}
                      />
                      <img
                        className="achievement-image"
                        src={placeholder}
                        alt={`achievement-${achievement._id}-img`}
                      />
                    </picture>
                    <div className="achievement-name">
                      {achievement.name}
                      {achievement.title ? (
                        <span className="title">
                          {' '}
                          [{achievement.title.name}]
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="achievement-description">
                      {achievement.description}
                    </div>
                    <button
                      className="delete-button"
                      title="Excluir conquista"
                      onClick={() => deleteAchievement(achievement._id)}
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="edit-button"
                      title="Editar conquista"
                      onClick={() => editAchievement(achievement._id)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={`editor ${showPanel ? 'shown' : ''}`}>
              <AchievementForm
                achievement={selectedAchievement}
                submitCallback={onSubmit}
              />
            </div>
          </div>
          <footer className="footer">
            <button onClick={createAchievement}>
              <span>Nova Conquista</span>
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

export default Achievements;
