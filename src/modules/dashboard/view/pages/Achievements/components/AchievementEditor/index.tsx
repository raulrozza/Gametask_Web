import React from 'react';

import { Container } from './styles';

interface AchievementEditorProps {
  visible: boolean;
  closeEditor: () => void;
}

const AchievementEditor: React.FC<AchievementEditorProps> = ({ visible }) => {
  return <Container $visible={visible} />;
};

export default AchievementEditor;
