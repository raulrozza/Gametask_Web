import React from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';
import achievementPlaceholder from 'assets/img/achievements/placeholder.png';

// Styles
import { Container, SRequestFooter } from './styles';

// Types
import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';

interface AchievementRequestModalProps {
  request: IAchievementRequest | null;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}

const AchievementDetails: React.FC<AchievementRequestModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) =>
  request ? (
    <Container>
      <header>
        <img
          className="user-image"
          src={request.requester.user.profile_url || userPlaceholder}
          alt={request.requester.user.firstname}
        />
        <img
          className="achievement-image"
          src={request.achievement.image_url || achievementPlaceholder}
          alt={request.achievement.name}
        />

        <strong>
          {request.achievement.name}
          {request.achievement.title && (
            <span> [{request.achievement.title.name}]</span>
          )}
        </strong>

        <span className="description">{request.achievement.description}</span>

        <span className="obtained-by">
          obtida por{' '}
          <strong>
            {request.requester.user.firstname} {request.requester.user.lastname}
          </strong>
        </span>
      </header>

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
        handleAccept={() => acceptRequest(request.id)}
        handleDecline={() => deleteRequest(request.id)}
      />
    </Container>
  ) : null;

export default AchievementDetails;
