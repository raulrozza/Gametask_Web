import React, { useCallback } from 'react';
import IActivity from 'modules/dashboard/domain/entities/IActivity';
import { EditButton, RemoveButton } from 'modules/dashboard/view/components';
import { Container, Experience, Name, Rules } from './styles';

interface ActivityProps {
  activity: IActivity;
  openEditorWith(activity: IActivity): void;
  removeActivity(id: string): void;
}

const ActivityCard: React.FC<ActivityProps> = ({
  activity,
  openEditorWith,
  removeActivity,
}) => {
  const handleDeleteActivity = useCallback(() => removeActivity(activity.id), [
    activity.id,
    removeActivity,
  ]);

  const handleEditActivity = useCallback(() => openEditorWith(activity), [
    activity,
    openEditorWith,
  ]);

  return (
    <Container>
      <Experience>{activity.experience} XP</Experience>

      <Name>{activity.name}</Name>

      {activity.description && <div>{activity.description}</div>}

      {activity.dmRules && (
        <Rules>
          Regras: <cite>{activity.dmRules}</cite>
        </Rules>
      )}

      <RemoveButton
        horizontalPosition="right"
        title="Excluir atividade"
        onClick={handleDeleteActivity}
      />

      <EditButton title="Editar atividades" onClick={handleEditActivity} />
    </Container>
  );
};

export default ActivityCard;
