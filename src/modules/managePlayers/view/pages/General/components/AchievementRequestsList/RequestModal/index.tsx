import React from 'react';

// Icons
import { FaCheck, FaTrash } from 'react-icons/fa';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';
import achievementPlaceholder from 'assets/img/achievements/placeholder.png';

// Types
import { AchievementRequestModalProps } from '../../../types';

// Styles
import { ModalContainer } from './styles';
import { RequestFooter } from '../../../styles';

const RequestModal: React.FC<AchievementRequestModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) =>
  request ? (
    <ModalContainer>
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

      <RequestFooter>
        <cite>
          Requisição feita em{' '}
          {new Date(request.requestDate).toLocaleDateString()},{' '}
          {new Date(request.requestDate).toLocaleTimeString()}
        </cite>

        <div>
          <button
            className="confirm"
            type="button"
            title="Aceitar Requisição"
            onClick={() => acceptRequest(request.id)}
          >
            <FaCheck />
          </button>

          <button
            className="delete"
            type="button"
            title="Remover Requisição"
            onClick={() => deleteRequest(request.id)}
          >
            <FaTrash />
          </button>
        </div>
      </RequestFooter>
    </ModalContainer>
  ) : null;

export default RequestModal;
