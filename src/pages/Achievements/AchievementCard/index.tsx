import React from 'react';

// Assets
import placeholder from '../../../assets/img/achievements/placeholder.png';

// Hooks
import { useApiDelete } from '../../../hooks/api/useApiDelete';

// Icons
import { FaEdit, FaTimes } from 'react-icons/fa';

// Styles
import { Container } from './styles';

// Types
import { AchievementCardProps } from './types';
import { RemoveButton } from '../../../styles';

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onDelete,
  onEdit,
}) => {
  const apiDelete = useApiDelete();

  const handleDeleteAchievement = async () => {
    const response = window.confirm(
      'Deseja mesmo excluir esta conquista? Esta ação não pode ser desfeita.',
    );

    if (!response) return;

    const success = await apiDelete(`/achievement/${achievement._id}`);

    if (success) onDelete();
  };

  return (
    <Container>
      <picture>
        <source
          srcSet={achievement.image ? achievement.image_url : undefined}
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
          <span className="title"> [{achievement.title.name}]</span>
        ) : (
          ''
        )}
      </div>

      <div className="achievement-description">{achievement.description}</div>

      <RemoveButton
        horizontalPosition="right"
        title="Excluir conquista"
        onClick={handleDeleteAchievement}
      >
        <FaTimes />
      </RemoveButton>

      <button
        className="edit-button"
        title="Editar conquista"
        onClick={() => onEdit(achievement._id)}
      >
        <FaEdit />
      </button>
    </Container>
  );
};

export default AchievementCard;
