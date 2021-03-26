import React from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';

// Icons
import { FaCheck, FaTrash } from 'react-icons/fa';

// Styles
import { ModalContainer } from './styles';
import { RequestFooter } from '../../styles';

// Types
import { ActivityModalProps } from './types';

const ActivityModal: React.FC<ActivityModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) => (
  <ModalContainer>
    <header>
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
    </header>

    <section>
      <span>{request.requester.user.firstname} informa: </span>

      <span>{request.information}</span>

      {request.activity.dmRules && (
        <cite>Recomendações: &quot;{request.activity.dmRules}&quot;</cite>
      )}
    </section>

    <RequestFooter>
      <cite>
        Requisição feita em {new Date(request.requestDate).toLocaleDateString()}
        , {new Date(request.requestDate).toLocaleTimeString()}
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
);

export default ActivityModal;
