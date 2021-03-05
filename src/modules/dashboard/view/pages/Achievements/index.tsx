import React from 'react';

// Components
import { Button } from 'shared/view/components';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import { AchievementEditor } from './components';
import { EmptyContent } from './styles';

// Hooks
import useFetchAchievementsController from 'modules/dashboard/infra/controllers/useFetchAchievementsController';
import { useItemEditorController } from 'modules/dashboard/view/hooks';

const Achievements: React.FC = () => {
  const {
    achievements,
    loading,
    fetchAchievements,
  } = useFetchAchievementsController();

  const editorController = useItemEditorController();
  /* const [
    selectedAchievement,
    setSelectedAchievement,
  ] = useState<IAchievement | null>(null);

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
              updateAchievements={fetchAchievements}
            />
          </DefaultPageContainer.Content>

          <DefaultPageContainer.Footer>
            <Button onClick={editorController.open}>Nova Conquista</Button>
          </DefaultPageContainer.Footer>
        </>
      )}
    </DefaultPageContainer>
  );
};

export default Achievements;
