import React, { useCallback } from 'react';

import placeholder from 'assets/img/achievements/placeholder.png';
import IAchievement from 'modules/dashboard/domain/entities/IAchievement';
import ITitle from 'modules/dashboard/domain/entities/ITitle';
import { EditButton, RemoveButton } from 'modules/dashboard/view/components';

import { Container, Description, Image, Name } from './styles';

interface AchievementCardProps {
  achievement: IAchievement;
  openEditorWith(achievement: IAchievement): void;
  removeAchievement(id: string): void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  openEditorWith,
  removeAchievement,
}) => {
  const handleDeleteAchievement = useCallback(
    () => removeAchievement(achievement.id),
    [achievement.id, removeAchievement],
  );

  const handleEditAchievement = useCallback(() => openEditorWith(achievement), [
    achievement,
    openEditorWith,
  ]);

  return (
    <Container>
      <picture>
        <source srcSet={achievement.image_url} />

        <Image src={placeholder} alt={achievement.name} />
      </picture>

      <Name>
        {achievement.name}

        {achievement.title && (
          <span> [{(achievement.title as ITitle).name}]</span>
        )}
      </Name>

      <Description>{achievement.description}</Description>

      <RemoveButton
        horizontalPosition="right"
        title="Excluir conquista"
        onClick={handleDeleteAchievement}
      />

      <EditButton title="Editar conquista" onClick={handleEditAchievement} />
    </Container>
  );
};

export default AchievementCard;
