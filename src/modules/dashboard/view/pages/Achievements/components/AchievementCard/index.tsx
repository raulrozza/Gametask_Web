import React, { useCallback } from 'react';

// Assets
import placeholder from 'assets/img/achievements/placeholder.png';

// Components
import { EditButton, RemoveButton } from 'modules/dashboard/view/components';
import { Container, Description, Image, Name } from './styles';

// Icons
import { FaEdit } from 'react-icons/fa';

// Types
import IAchievement from 'modules/dashboard/entities/IAchievement';
import ITitle from 'modules/dashboard/entities/ITitle';

interface AchievementCardProps {
  achievement: IAchievement;
  openEditorWith(achievement: IAchievement): void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  openEditorWith,
}) => {
  const handleDeleteAchievement = async () => {
    /* const response = window.confirm(
      'Deseja mesmo excluir esta conquista? Esta ação não pode ser desfeita.',
    );

    if (!response) return;

    const success = await apiDelete(`/achievement/${achievement._id}`);

    if (success) onDelete(); */
  };

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

      <EditButton title="Editar conquista" onClick={handleEditAchievement}>
        <FaEdit />
      </EditButton>
    </Container>
  );
};

export default AchievementCard;
