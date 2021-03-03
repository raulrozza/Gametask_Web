import React from 'react';

// Components
import { Button } from 'shared/view/components';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import { AchievementEditor } from './components';
import { EmptyContent } from './styles';
import AchievementForm from './AchievementForm';

// Hooks
import useFetchAchievementsController from 'modules/dashboard/infra/controllers/useFetchAchievementsController';
import { useItemEditorController } from 'modules/dashboard/view/hooks';

// Icons
import { FaPlus } from 'react-icons/fa';

// Styles
import { Editor } from 'components/PageWrapper/styles';

// Types
import { IAchievement } from 'interfaces/api/Achievement';

// Utils
import { findAchievementById } from './utils';
import AchievementCard from './AchievementCard';

const Achievements: React.FC = () => {
  const { achievements, loading } = useFetchAchievementsController();

  const editorController = useItemEditorController();
  /* const [
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
  }; */

  return (
    <DefaultPageContainer title="Conquistas">
      {loading ? (
        <DefaultPageLoading />
      ) : (
        <>
          <DefaultPageContainer.Content>
            {achievements.length === 0 ? (
              <EmptyContent>Não há conquistas ainda.</EmptyContent>
            ) : null}

            <AchievementEditor
              visible={editorController.visible}
              closeEditor={editorController.close}
            />
          </DefaultPageContainer.Content>

          <DefaultPageContainer.Footer>
            <Button onClick={editorController.open}>Nova Conquista</Button>
          </DefaultPageContainer.Footer>
        </>
      )}
      {/* {!loading ? (
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
            )}

            <Editor shown={showPanel}>
              <AchievementForm
                achievement={selectedAchievement}
                submitCallback={onSubmit}
              />
            </Editor>
          </Row>
        </>
      ) */}
    </DefaultPageContainer>
  );
};

export default Achievements;
