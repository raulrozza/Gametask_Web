import React, { useState } from 'react';

// Assets
import placeholder from '../../assets/img/achievements/placeholder.png';

// Components
import AchievementForm from './AchievementForm';
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Hooks
import { useApiDelete } from '../../hooks/api/useApiDelete';
import { useApiFetch } from '../../hooks/api/useApiFetch';

// Icons
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

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
import { IAchievement } from '../../interfaces/api/Achievement';

// Utils
import { findAchievementById } from './utils';

const Achievements: React.FC = () => {
  const [
    selectedAchievement,
    setSelectedAchievement,
  ] = useState<IAchievement | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const { data: achievements, loading, fetch } = useApiFetch<IAchievement[]>(
    '/achievement',
  );
  const apiDelete = useApiDelete();

  if (!loading && !achievements) return null;

  const handleEditAchievement = (id: string) => {
    if (!achievements) return;

    const foundAchievement = findAchievementById(achievements, id);

    if (!foundAchievement) return;

    const achievement = {
      ...foundAchievement,
      image: foundAchievement.image ? foundAchievement.image_url : undefined,
    };

    setSelectedAchievement(achievement);

    const isAchievementAlreadySelected =
      selectedAchievement && foundAchievement._id === selectedAchievement._id;

    if (!showPanel || isAchievementAlreadySelected) setShowPanel(!showPanel);
  };

  const handleAddAchievement = () => {
    setSelectedAchievement(null);
    setShowPanel(true);
  };

  const handleDeleteAchievement = async (id: string) => {
    const response = window.confirm(
      'Deseja mesmo excluir esta conquista? Esta ação não pode ser desfeita.',
    );

    if (!response) return;

    const success = await apiDelete(`/achievement/${id}`);

    if (success) fetch();
  };

  const onSubmit = async () => {
    fetch();
    setShowPanel(false);
  };

  return (
    <PageWrapper title="Conquistas">
      {!loading ? (
        <>
          <Row>
            {achievements && achievements.length > 0 ? (
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
                        onClick={() => handleDeleteAchievement(achievement._id)}
                      >
                        <FaTimes />
                      </RemoveButton>

                      <button
                        className="edit-button"
                        title="Editar conquista"
                        onClick={() => handleEditAchievement(achievement._id)}
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
            <button onClick={handleAddAchievement}>
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
