import React, { useState, useCallback } from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';

// Components
import { Loading, Modal } from 'components';
import { ActivityModal } from '..';

// Hooks
import { useActivityRequests } from './hooks';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { BsController } from 'react-icons/bs';

// Styles
import { RequestsContainer } from './styles';
import { NoRequests, RequestFooter } from '../../styles';

// Types
import { IActivityRequest } from '../../types';

const ActivityRegister: React.FC = () => {
  const {
    requests,
    loading,
    handleAcceptRegister,
    handleDeleteRegister,
  } = useActivityRequests();
  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState<IActivityRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onAcceptRegister = useCallback(
    async (id: string) => {
      const success = await handleAcceptRegister(id);

      if (success) setShowModal(false);
    },
    [handleAcceptRegister],
  );

  const handleShowDetails = useCallback((request: IActivityRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  }, []);

  return (
    <RequestsContainer>
      {loading ? (
        <Loading />
      ) : (
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
                      onClick={() => onAcceptRegister(request._id)}
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
      )}

      {showModal && selectedRequest && (
        <Modal closeModal={() => setShowModal(false)} title="Atividade">
          <ActivityModal
            request={selectedRequest}
            deleteRequest={handleDeleteRegister}
            acceptRequest={handleAcceptRegister}
          />
        </Modal>
      )}
    </RequestsContainer>
  );
};

export default ActivityRegister;
