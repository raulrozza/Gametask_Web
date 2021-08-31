import React from 'react';

// Assets
import achievementPlaceholder from 'assets/img/achievements/placeholder.png';
import userPlaceholder from 'assets/img/users/placeholder.png';

// Styles
import IGrantAchievementDTO from 'modules/managePlayers/domain/dtos/IGrantAchievementDTO';
import IAchievementRequest from 'modules/managePlayers/domain/entities/IAchievementRequest';

import {
  AchievementImage,
  Container,
  Description,
  ObtainedBy,
  Title,
  UserInfo,
  UserImage,
  SRequestFooter,
} from './styles';

// Types

interface AchievementRequestModalProps {
  request: IAchievementRequest | null;
  deleteRequest: (id: string) => void;
  acceptRequest: (data: IGrantAchievementDTO) => void;
}

const AchievementDetails: React.FC<AchievementRequestModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) =>
  request ? (
    <Container>
      <UserInfo>
        <UserImage
          src={request.requester.user.profile_url || userPlaceholder}
          alt={request.requester.user.firstname}
        />

        <AchievementImage
          src={request.achievement.image_url || achievementPlaceholder}
          alt={request.achievement.name}
        />

        <Title>
          {request.achievement.name}

          {request.achievement.title && (
            <span> [{request.achievement.title.name}]</span>
          )}
        </Title>

        <Description>{request.achievement.description}</Description>

        <ObtainedBy>
          Obtida por{' '}
          <strong>
            {request.requester.user.firstname} {request.requester.user.lastname}
          </strong>
        </ObtainedBy>
      </UserInfo>

      <section>
        <span>{request.requester.user.firstname} informa: </span>

        <span>{request.information}</span>
      </section>

      <SRequestFooter
        information={`Requisição feita em ${new Date(
          request.requestDate,
        ).toLocaleDateString()}, ${new Date(
          request.requestDate,
        ).toLocaleTimeString()}`}
        handleAccept={() =>
          acceptRequest({
            achievementId: request.achievement.id,
            playerId: request.requester.id,
            userId: request.requester.user.id,
            requestId: request.id,
          })
        }
        handleDecline={() => deleteRequest(request.id)}
      />
    </Container>
  ) : null;

export default AchievementDetails;
