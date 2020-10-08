import React, { useEffect, useState } from 'react';

// Assets
import placeholder from '../../assets/img/achievements/placeholder.png';

// Components
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

// Custom components
import AchievementForm from './AchievementForm';
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Hooks
import { useAuth } from '../../hooks/contexts/useAuth';

// Services
import api from '../../services/api';

// Styles
import { Container } from './styles';
import { RemoveButton } from '../../styles/RemoveButton';
import {
  EmptyContainer,
  Footer,
  Loader,
  Editor,
  Row,
} from '../../components/PageWrapper/styles';

// Types
import { IAchievement } from 'game';

// Utils
import {
  addItemToArray,
  updateItemInArray,
  removeItemFromArray,
} from '../../utils/arrayMethods';
import handleApiErrors from '../../utils/handleApiErrors';

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
        handleApiErrors(error);
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
        handleApiErrors(error, signOut);
      }
    })();
  }, [signOut]);

  const onSubmit = async (id: string) => {
    try {
      const { data } = await api.get(`/achievement/${id}`);

      const index = achievements.findIndex(item => item._id === id);

      if (index === -1) setAchievements(addItemToArray(achievements, data));
      else setAchievements(updateItemInArray(achievements, data, index));
      setShowPanel(false);
    } catch (error) {
      handleApiErrors(error);
    }
  };

  return (
    <PageWrapper title="Conquistas">
      {!loading ? (
        <>
          <Row>
            {achievements.length > 0 ? (
              <div>
                <Container reduced={showPanel}>
                  {achievements.map(achievement => (
                    <div key={achievement._id} className="achievement">
                      <picture>
                        <source
                          srcSet={
                            achievement.image
                              ? achievement.image_url
                              : undefined
                          }
                        />

                        <img
                          className="achievement-image"
                          src={placeholder}
                          alt={`achievement-${achievement._id}`}
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

                      <RemoveButton
                        horizontalPosition="right"
                        title="Excluir conquista"
                        onClick={() => deleteAchievement(achievement._id)}
                      >
                        <FaTimes />
                      </RemoveButton>

                      <button
                        className="edit-button"
                        title="Editar conquista"
                        onClick={() => editAchievement(achievement._id)}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  ))}
                </Container>
              </div>
            ) : (
              <EmptyContainer reduced={showPanel}>
                Não há conquistas ainda.
              </EmptyContainer>
            )}

            <Editor shown={showPanel}>
              <AchievementForm
                achievement={selectedAchievement}
                submitCallback={onSubmit}
              />
            </Editor>
          </Row>

          <Footer>
            <button onClick={createAchievement}>
              <span>Nova Conquista</span>
              <span className="plus-icon">
                <FaPlus />
              </span>
            </button>
          </Footer>
        </>
      ) : (
        <Loader>
          <Loading />
        </Loader>
      )}
    </PageWrapper>
  );
};

export default Achievements;
