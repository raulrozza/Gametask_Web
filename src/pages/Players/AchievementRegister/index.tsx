import React, { useState, useEffect } from 'react';

// Assets
import userPlaceholder from '../../../assets/img/users/placeholder.png';
import achievementPlaceholder from '../../../assets/img/achievements/placeholder.png';

// Components
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import RequestModal from './RequestModal';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Styles
import { NoRequests, RequestsContainer, RequestFooter } from '../styles';

// Services
import api from '../../../services/api';

// Utils
import { removeItemFromArray } from '../../../utils/arrayMethods';
import handleErrors from '../../../utils/handleErrors';

// Types
import { IAchievementRequest } from '../types';
import { BsController } from 'react-icons/bs';

const AchievementRegister: React.FC = () => {
  // States
  const [requests, setRequests] = useState<IAchievementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState<IAchievementRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('achievementRegister');

        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, []);

  const handleDeleteRegister = (id: string) => {
    if (window.confirm('Deseja realmente excluir esta requisição?')) {
      try {
        api.delete(`/achievementRegister/${id}`);

        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );
      } catch (error) {
        handleErrors(error);
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
          achievementId: request.achievement._id,
          registerId: id,
        };

        /* api.post('/experience', data);

        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        ); */

        setShowModal(false);
      } catch (error) {
        handleErrors(error);
      }
    }
  };

  const handleShowDetails = (request: IAchievementRequest) => {
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
              requests.map(({ requester: user, achievement, ...request }) => (
                <li className="request" key={request._id}>
                  <section className="main">
                    <img
                      src={user.image ? user.profile_url : userPlaceholder}
                      alt={user.firstname}
                    />

                    <img
                      src={
                        achievement.image
                          ? achievement.image_url
                          : achievementPlaceholder
                      }
                      alt={achievement.name}
                    />

                    <div>
                      <span className="title">
                        <strong>{user.firstname}</strong>
                        {` | `}
                        <strong>{achievement.name}</strong>
                      </span>

                      <span className="info">{request.information}</span>
                    </div>
                  </section>
                  <RequestFooter>
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
                            achievement,
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
                  </RequestFooter>
                </li>
              ))
            ) : (
              <NoRequests>
                <BsController />
                Não há requisições!
              </NoRequests>
            )}
          </ul>
          {showModal && selectedRequest && (
            <Modal closeModal={() => setShowModal(false)} title="Conquista">
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

export default AchievementRegister;
