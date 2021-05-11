import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyBoxMessage } from '../ExpandableBox';

const NoActivities: React.FC = () => (
  <EmptyBoxMessage>
    Não há nenhuma atividade. <Link to="/activities">Cadastre</Link> alguma para
    que os jogadores possam pontuar!
  </EmptyBoxMessage>
);

export default NoActivities;
