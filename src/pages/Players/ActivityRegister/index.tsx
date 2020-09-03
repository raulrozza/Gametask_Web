import React, { useState, useEffect } from 'react';

// Assets
import userPlaceholder from '../../../assets/img/users/placeholder.png';

// Components
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import RequestModal from './RequestModal';

// Contexts
import { useAuth } from '../../../contexts/Authorization';
import { useGame } from '../../../contexts/Game';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { BsController } from 'react-icons/bs';

// Libs
import { toast } from 'react-toastify';

// Services
import api from '../../../services/api';

// Styles
import { NoRequests, RequestsContainer, RequestFooter } from '../styles';

// Types
import { IActivityRequest } from '../types';

// Utils
import { removeItemFromArray } from '../../../utils/arrayMethods';
import handleErrors from '../../../utils/handleErrors';

const ActivityRegister: React.FC = () => {
  // States
  const [requests, setRequests] = useState<IActivityRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState<IActivityRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Hooks
  const { user } = useAuth();
  const { refreshGame } = useGame();

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('activityRegister');

        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        handleErrors(error);
      }
    })();
  }, []);

  const handleDeleteRegister = async (id: string) => {
    if (window.confirm('Deseja realmente excluir esta requisição?')) {
      try {
        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );

        await api.delete(`/activityRegister/${id}`);

        toast.update('Requisição excluída');
      } catch (error) {
        handleErrors(error);
      }
    }
  };

  const handleAcceptRegister = async (id: string) => {
    const request = requests.find(item => item._id === id);

    if (!request) return;

    if (window.confirm('Confirmar pontuação?')) {
      try {
        const data = {
          userId: user._id,
          playerId: request.requester._id,
          activityId: request.activity._id,
          registerId: id,
          experience: request.activity.experience,
          completionDate: request.completionDate,
        };

        setRequests(
          removeItemFromArray(
            requests,
            requests.findIndex(request => request._id === id),
          ),
        );

        await api.post('/experience', data);

        toast.success('Requisição aceita!');

        refreshGame();

        setShowModal(false);
      } catch (error) {
        handleErrors(error);
      }
    }
  };

  const handleShowDetails = (request: IActivityRequest) => {
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
              requests.map(({ requester, activity, ...request }) => (
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

                    <div>
                      <span className="title">
                        <strong>{requester.user.firstname}</strong>
                        {` | `}
                        <strong>
                          {activity.name} ({activity.experience} XP)
                        </strong>
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
