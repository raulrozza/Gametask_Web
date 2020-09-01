import React from 'react';

// Icons
import { FaCheck, FaTrash } from 'react-icons/fa';

// Assets
import userPlaceholder from '../../../../assets/img/users/placeholder.png';

// Types
import { ActivityRequestModalProps } from '../../types';

// Styles
import { ModalContainer } from './styles';
import { RequestFooter } from '../../styles';

const RequestModal: React.FC<ActivityRequestModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) => (
  <ModalContainer>
    <header>
      <img
        src={
          request.requester.image
            ? request.requester.profile_url
            : userPlaceholder
        }
        alt={request.requester.firstname}
      />

      <strong>
        {request.activity.name} ({request.activity.experience} XP)
      </strong>

      <span>
        concluído por{' '}
        <strong>
          {request.requester.firstname} {request.requester.lastname}
        </strong>{' '}
        em {new Date(request.completionDate).toLocaleDateString()}
      </span>
    </header>

    <section>
      <span>{request.requester.firstname} informa: </span>

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
          onClick={() => acceptRequest(request._id)}
        >
          <FaCheck />
        </button>

        <button
          className="delete"
          type="button"
          title="Remover Requisição"
          onClick={() => deleteRequest(request._id)}
        >
          <FaTrash />
        </button>
      </div>
    </RequestFooter>
  </ModalContainer>
);

export default RequestModal;
