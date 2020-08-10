import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import Loading from '../../Loading';
import Modal from '../../Modal';

// Icons
import { FaCheck, FaTrashAlt, FaTrash } from 'react-icons/fa';
import { BsController } from 'react-icons/bs';

// Services
import api from '../../../services/api';

// Utils
import { removeItemFromArray } from '../../../utils/arrayMethods';

// Assets
import userPlaceholder from '../../../assets/img/users/placeholder.png';

import './styles.css';

interface IRequest {
  _id: string;
  requester: {
    _id: string;
    firstname: string;
    lastname: string;
    image?: string | null;
    profile_url: string;
  };
  activity: {
    _id: string;
    name: string;
    experience: number;
    dmRules?: string | null;
  };
  completionDate: string;
  information: string;
  requestDate: string;
}

interface ModalProps {
  request: IRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}

const RequestModal: React.FC<ModalProps> = ({
  request,
  deleteRequest,
  acceptRequest,
}) => (
  <div className="request-modal">
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
  </div>
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
  deleteRequest: PropTypes.func.arguments({
    id: PropTypes.string.isRequired,
  }),
  acceptRequest: PropTypes.func.arguments({
    id: PropTypes.string.isRequired,
  }),
};

RequestModal.defaultProps = {
  request: {
    _id: '',
    requester: {
      _id: '',
      firstname: '',
      lastname: '',
      profile_url: '',
    },
    activity: {
      _id: '',
      name: '',
      experience: 0,
    },
    completionDate: '',
    requestDate: '',
    information: '',
  },
  deleteRequest: () => {
    console.log('Not implemented.');
  },
  acceptRequest: () => {
    console.log('Not implemented.');
  },
};

const ActivityRegister: React.FC = () => {
  // States
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('activityRegisters');

        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleDeleteRegister = (id: string) => {
    if (window.confirm('Deseja realmente excluir esta requisição?')) {
      try {
        api.delete(`/activityRegister/${id}`);

        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAcceptRegister = (id: string) => {
    const request = requests.find(item => item._id === id);

    if (!request) return;

    if (window.confirm('Confirmar pontuação?')) {
      try {
        const data = {
          userId: request.requester._id,
          activityId: request.activity._id,
          registerId: id,
          experience: request.activity.experience,
          completionDate: request.completionDate,
        };

        api.post('/experience', data);

        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );

        setShowModal(false);
      } catch (error) {
        console.error(error, error.response?.data);
      }
    }
  };

  const handleShowDetails = (request: IRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  return (
    <div className="requests-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ul className="request-list">
            {requests.length > 0 ? (
              requests.map(({ requester: user, activity, ...request }) => (
                <li className="request" key={request._id}>
                  <section className="main">
                    <img
                      src={user.image ? user.profile_url : userPlaceholder}
                      alt={user.firstname}
                    />

                    <div>
                      <span className="title">
                        <strong>{user.firstname}</strong>
                        {` | `}
                        <strong>
                          {activity.name} ({activity.experience} XP)
                        </strong>
                      </span>

                      <span className="info">{request.information}</span>
                    </div>
                  </section>
                  <footer>
                    <span>
                      {new Date(request.requestDate).toLocaleDateString()}
                    </span>
                    <div>
                      <button
                        className="details"
                        type="button"
                        title="Detalhes da Requisição"
                        onClick={() =>
                          handleShowDetails({
                            ...request,
                            requester: user,
                            activity,
                          })
                        }
                      >
                        Ver Mais
                      </button>
                      <button
                        className="confirm"
                        type="button"
                        title="Aceitar Requisição"
                        onClick={() => handleAcceptRegister(request._id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="delete"
                        type="button"
                        title="Remover Requisição"
                        onClick={() => handleDeleteRegister(request._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </footer>
                </li>
              ))
            ) : (
              <div className="no-requests">
                <BsController />
                Não há requisições!
              </div>
            )}
          </ul>
          {showModal && selectedRequest && (
            <Modal
              closeModal={() => setShowModal(false)}
              show={showModal}
              title="Atividade"
            >
              <RequestModal
                request={selectedRequest}
                deleteRequest={handleDeleteRegister}
                acceptRequest={handleAcceptRegister}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default ActivityRegister;
