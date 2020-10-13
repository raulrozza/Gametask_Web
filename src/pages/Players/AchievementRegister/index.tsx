import React, { useState, useEffect, useCallback } from 'react';

// Assets
import userPlaceholder from '../../../assets/img/users/placeholder.png';
import achievementPlaceholder from '../../../assets/img/achievements/placeholder.png';

// Components
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import RequestModal from './RequestModal';

// Hooks
import { useAuth } from '../../../hooks/contexts/useAuth';
import { useGameData } from '../../../hooks/contexts/useGameData';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Libs
import { toast } from 'react-toastify';

// Styles
import { NoRequests, RequestsContainer, RequestFooter } from '../styles';

// Services
import api from '../../../services/api';

// Utils
import { removeItemFromArray } from '../../../utils/arrayMethods';
import handleApiErrors from '../../../utils/handleApiErrors';

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

  // Hooks
  const { user } = useAuth();
  const { refreshGame } = useGameData();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('achievementRegister');

        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        handleApiErrors(error);
      }
    })();
  }, []);

  const handleDeleteRegister = useCallback(async (id: string) => {
    if (window.confirm('Deseja realmente excluir esta requisição?')) {
      try {
        setRequests(requests =>
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );

        await api.delete(`/achievementRegister/${id}`);

        toast.update('Requisição excluída');
      } catch (error) {
        handleApiErrors(error);
      }
    }
  }, []);

  const handleAcceptRegister = useCallback(
    async (id: string) => {
      const request = requests.find(item => item._id === id);

      if (!request || !user) return;

      if (window.confirm('Garantir conquista?')) {
        try {
          const data = {
            userId: user._id,
            playerId: request.requester._id,
            achievementId: request.achievement._id,
            registerId: id,
          };

          setRequests(
            removeItemFromArray(
              requests,
              requests.findIndex(request => request._id === id),
            ),
          );

          await api.post('/unlockAchievement', data);

          toast.success('Conquista garantida.');

          refreshGame();

          setShowModal(false);
        } catch (error) {
          handleApiErrors(error);
        }
      }
    },
    [requests, refreshGame, user],
  );

  const handleShowDetails = useCallback((request: IAchievementRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  }, []);

  return (
    <RequestsContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ul className="request-list">
            {requests.length > 0 ? (
              requests.map(({ requester, achievement, ...request }) => (
                <li className="request" key={request._id}>
                  <section className="main">
                    <img
                      src={
                        requester.user.image
                          ? requester.user.profile_url
                          : userPlaceholder
                      }
                      alt={requester.user.firstname}
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
                        <strong>{requester.user.firstname}</strong>
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
                            requester,
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
