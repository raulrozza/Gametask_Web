import React, { useCallback } from 'react';

// Components
import { Button } from 'shared/view/components';
import {
  DefaultPageContainer,
  DefaultPageLoading,
} from 'modules/dashboard/view/components';
import { AchievementCard, AchievementEditor } from './components';
import { AchievementsContainer, EmptyContent } from './styles';

// Hooks
import useFetchAchievementsController from 'modules/dashboard/infra/controllers/useFetchAchievementsController';
import { useItemEditorController } from 'modules/dashboard/view/hooks';
import { useEditAchievementSelector } from 'modules/dashboard/view/pages/Achievements/hooks';
import IAchievement from 'modules/dashboard/entities/IAchievement';

const Achievements: React.FC = () => {
  const {
    achievements,
    loading,
    fetchAchievements,
  } = useFetchAchievementsController();

  const editorController = useItemEditorController();

  const { achievementValues, openEditorWith } = useEditAchievementSelector();

  const handleOpenEditorWith = useCallback(
    (achievement?: IAchievement) => {
      openEditorWith(achievement);
      editorController.toggle();
    },
    [editorController, openEditorWith],
  );

  return (
    <DefaultPageContainer title="Conquistas">
      {loading ? (
        <DefaultPageLoading />
      ) : (
        <>
          <DefaultPageContainer.Content>
            {achievements.length === 0 ? (
              <EmptyContent>Não há conquistas ainda.</EmptyContent>
            ) : (
              <AchievementsContainer>
                {achievements.map(achievement => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    openEditorWith={handleOpenEditorWith}
                  />
                ))}
              </AchievementsContainer>
            )}

            <AchievementEditor
              visible={editorController.visible}
              closeEditor={editorController.close}
              updateAchievements={fetchAchievements}
              initialValues={achievementValues}
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
