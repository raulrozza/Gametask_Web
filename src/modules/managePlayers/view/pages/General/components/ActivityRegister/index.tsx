import React, { useState, useCallback } from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';

// Components
import { Loading } from 'shared/view/components';
import { Modal } from 'components';
import { ActivityModal, NoRequests } from '..';

// Hooks
import useFetchActivityRequestsController from 'modules/managePlayers/infra/controllers/useFetchActivityRequestsController';
import { useActivityRequests } from './hooks';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Styles
import { RequestsContainer } from './styles';
import { RequestFooter } from '../../styles';

// Types
import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';

const ActivityRegister: React.FC = () => {
  const {
    loading,
    activityRequests,
    fetchActivityRequests,
  } = useFetchActivityRequestsController();
  const { handleAcceptRegister, handleDeleteRegister } = useActivityRequests();
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
          {activityRequests.length > 0 ? (
            activityRequests.map(({ requester, activity, ...request }) => (
              <li className="request" key={request.id}>
                <section className="main">
                  <img
                    src={requester.user.profile_url || userPlaceholder}
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
                      onClick={() => onAcceptRegister(request.id)}
                    >
                      <FaCheck />
                    </button>

                    <button
                      className="delete"
                      type="button"
                      title="Remover Requisição"
                      onClick={() => handleDeleteRegister(request.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </RequestFooter>
              </li>
            ))
          ) : (
            <NoRequests />
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
