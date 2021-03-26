import React, { useState, useCallback } from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';

// Components
import { Loading } from 'shared/view/components';
import { Modal } from 'components';
import { ActivityModal, NoRequests } from '..';

// Hooks
import useAcceptActivityRequestController from 'modules/managePlayers/infra/controllers/useAcceptActivityRequestController';
import useDeleteActivityRequestController from 'modules/managePlayers/infra/controllers/useDeleteActivityRequestController';
import useFetchActivityRequestsController from 'modules/managePlayers/infra/controllers/useFetchActivityRequestsController';
import { useModalController } from 'shared/view/components/Modal';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Styles
import { SRequestsContainer } from './styles';
import { RequestFooter } from '../../styles';

// Types
import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';

const ActivityRequestsList: React.FC = () => {
  const {
    loading,
    activityRequests,
    fetchActivityRequests,
  } = useFetchActivityRequestsController();
  const { acceptActivityRequest } = useAcceptActivityRequestController();
  const { deleteActivityRequest } = useDeleteActivityRequestController();

  const [
    openDetails,
    handleOpenDetails,
    handleCloseDetails,
  ] = useModalController();

  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState<IActivityRequest | null>(null);

  const onAcceptRequest = useCallback(
    async (id: string) => {
      const success = await acceptActivityRequest(id);

      if (success) {
        fetchActivityRequests();
        handleCloseDetails();
      }
    },
    [acceptActivityRequest, fetchActivityRequests, handleCloseDetails],
  );

  const onDeleteRequest = useCallback(
    async (id: string) => {
      const success = await deleteActivityRequest(id);

      if (success) {
        fetchActivityRequests();
        handleCloseDetails();
      }
    },
    [deleteActivityRequest, fetchActivityRequests, handleCloseDetails],
  );

  const handleShowDetails = useCallback(
    (request: IActivityRequest) => {
      setSelectedRequest(request);
      handleOpenDetails();
    },
    [handleOpenDetails],
  );

  return (
    <SRequestsContainer>
      {loading ? (
        <Loading />
      ) : (
        <SRequestsContainer.List>
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
                      onClick={() => onAcceptRequest(request.id)}
                    >
                      <FaCheck />
                    </button>

                    <button
                      className="delete"
                      type="button"
                      title="Remover Requisição"
                      onClick={() => onDeleteRequest(request.id)}
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
        </SRequestsContainer.List>
      )}

      {openDetails && selectedRequest && (
        <Modal closeModal={handleCloseDetails} title="Atividade">
          <ActivityModal
            request={selectedRequest}
            deleteRequest={onDeleteRequest}
            acceptRequest={onAcceptRequest}
          />
        </Modal>
      )}
    </SRequestsContainer>
  );
};

export default ActivityRequestsList;
