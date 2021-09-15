import React from 'react';

import placeholder from 'assets/img/achievements/placeholder.png';
import IAchievement from 'modules/dashboard/domain/entities/IAchievement';

import { Container } from './styles';

const AchievementCard: React.FC<IAchievement> = ({ name, image_url }) => (
  <Container>
    <picture>
      <source srcSet={image_url || undefined} />

      <img className="image" src={placeholder} alt={name} />
    </picture>

    <div className="name">{name}</div>
  </Container>
);

export default AchievementCard;
