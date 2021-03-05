import React from 'react';

// Assets
import placeholder from 'assets/img/achievements/placeholder.png';

// Components
import { RemoveButton } from 'modules/dashboard/view/components';
import { Container, Description, Image, Name } from './styles';

// Icons
import { FaEdit } from 'react-icons/fa';

// Types
import IAchievement from 'modules/dashboard/entities/IAchievement';
import ITitle from 'modules/dashboard/entities/ITitle';

interface AchievementCardProps {
  achievement: IAchievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const handleDeleteAchievement = async () => {
    /* const response = window.confirm(
      'Deseja mesmo excluir esta conquista? Esta ação não pode ser desfeita.',
    );

    if (!response) return;

    const success = await apiDelete(`/achievement/${achievement._id}`);

    if (success) onDelete(); */
  };

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

      <button
        className="edit-button"
        title="Editar conquista"
        /* onClick={() => onEdit(achievement._id)} */
      >
        <FaEdit />
      </button>
    </Container>
  );
};

export default AchievementCard;
