import React from 'react';
import PropTypes from 'prop-types';

// Icons
import { FaCheck, FaTrash } from 'react-icons/fa';

// Assets
import userPlaceholder from '../../../../assets/img/users/placeholder.png';

// Types
import { RequestModalProps } from '../../types';

// Styles
import { ModalContainer } from './styles';

const RequestModal: React.FC<RequestModalProps> = ({
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

    <footer>
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
    </footer>
  </ModalContainer>
);

RequestModal.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    requester: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      image: PropTypes.string,
      profile_url: PropTypes.string.isRequired,
    }).isRequired,
    activity: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      experience: PropTypes.number.isRequired,
      dmRules: PropTypes.string,
    }).isRequired,
    completionDate: PropTypes.string.isRequired,
    requestDate: PropTypes.string.isRequired,
    information: PropTypes.string.isRequired,
  }).isRequired,
  deleteRequest: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
};

export default RequestModal;
