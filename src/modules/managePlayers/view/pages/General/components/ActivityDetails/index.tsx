import React from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';

// Styles
import IActivityRequest from 'modules/managePlayers/domain/entities/IActivityRequest';

import {
  Container,
  DescriptionBlock,
  Divider,
  SRequestFooter,
  UserInfo,
} from './styles';

// Types

interface ActivityModalProps {
  request: IActivityRequest | null;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}

const ActivityDetails: React.FC<ActivityModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) =>
  request ? (
    <Container>
      <UserInfo>
        <img
          src={request.requester.user.profile_url || userPlaceholder}
          alt={request.requester.user.firstname}
        />

        <strong>
          {request.activity.name} ({request.activity.experience} XP)
        </strong>

        <span>
          concluído por{' '}
          <strong>
            {request.requester.user.firstname} {request.requester.user.lastname}
          </strong>{' '}
          em {new Date(request.completionDate).toLocaleDateString()}
        </span>
      </UserInfo>

      <Divider />

      <DescriptionBlock>
        <span>{request.requester.user.firstname} informa: </span>

        <span>{request.information}</span>

        {request.activity.dmRules && (
          <cite>Recomendações: &quot;{request.activity.dmRules}&quot;</cite>
        )}
      </DescriptionBlock>

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

export default ActivityDetails;
