import React, { useState } from 'react';

// Components
import AchievementForm from './AchievementForm';
import PageWrapper from '../../components/PageWrapper';
import Loading from '../../components/Loading';

// Hooks
import { useApiFetch } from '../../hooks/api/useApiFetch';

// Icons
import { FaPlus } from 'react-icons/fa';

// Styles
import { Container } from './styles';
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
import AchievementCard from './AchievementCard';

const Achievements: React.FC = () => {
  const [
    selectedAchievement,
    setSelectedAchievement,
  ] = useState<IAchievement | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const { data: achievements, loading, fetch } = useApiFetch<IAchievement[]>(
    '/achievement',
  );

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
                    <AchievementCard
                      key={achievement._id}
                      achievement={achievement}
                      onEdit={handleEditAchievement}
                      onDelete={fetch}
                    />
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
