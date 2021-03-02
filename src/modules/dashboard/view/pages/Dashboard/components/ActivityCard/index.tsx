import React from 'react';
import IActivity from 'modules/dashboard/entities/IActivity';

import { Container } from './styles';

const ActivityCard: React.FC<IActivity> = ({ name, experience }) => (
  <Container>
    <div className="name">{name}</div>

    <div className="experience">{experience} XP</div>
  </Container>
);

export default ActivityCard;
