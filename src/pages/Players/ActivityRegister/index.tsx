import React, { useState, useEffect } from 'react';

// Components
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import RequestModal from './RequestModal';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { BsController } from 'react-icons/bs';

// Services
import api from '../../../services/api';

// Utils
import { removeItemFromArray } from '../../../utils/arrayMethods';

// Assets
import userPlaceholder from '../../../assets/img/users/placeholder.png';

// Types
import { IRequest } from '../types';

// Styles
import { RequestsContainer } from './styles';

const ActivityRegister: React.FC = () => {
  // States
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('activityRegister');

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
    <RequestsContainer>
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
            <Modal closeModal={() => setShowModal(false)} title="Atividade">
              <RequestModal
                request={selectedRequest}
                deleteRequest={handleDeleteRegister}
                acceptRequest={handleAcceptRegister}
              />
            </Modal>
          )}
        </>
      )}
    </RequestsContainer>
  );
};

export default ActivityRegister;
