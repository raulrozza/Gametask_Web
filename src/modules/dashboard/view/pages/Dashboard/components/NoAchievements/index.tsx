import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyBoxMessage } from '../ExpandableBox';

const NoAchievements: React.FC = () => (
  <EmptyBoxMessage>
    Não existe nenhuma conquista no jogo. Que tal{' '}
    <Link to="/achievements">adicionar uma?</Link>
  </EmptyBoxMessage>
);

export default NoAchievements;
