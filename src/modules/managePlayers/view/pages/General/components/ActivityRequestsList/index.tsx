import React, { useState, useCallback } from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';

// Components
import { Loading, Modal } from 'shared/view/components';
import { ActivityDetails, NoRequests, RequestFooter } from '..';

// Hooks
import useAcceptActivityRequestController from 'modules/managePlayers/infra/controllers/useAcceptActivityRequestController';
import useDeleteActivityRequestController from 'modules/managePlayers/infra/controllers/useDeleteActivityRequestController';
import useFetchActivityRequestsController from 'modules/managePlayers/infra/controllers/useFetchActivityRequestsController';
import { useModalController } from 'shared/view/components/Modal';

// Styles
import {
  SRequestsContainer,
  RequestItem,
  Grid,
  Image,
  Info,
  Title,
} from './styles';

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
              <RequestItem key={request.id}>
                <Grid>
                  <Image
                    src={requester.user.profile_url || userPlaceholder}
                    alt={requester.user.firstname}
                  />

                  <div>
                    <Title>
                      <strong>{requester.user.firstname}</strong>

                      {` | `}

                      <strong>
                        {activity.name} ({activity.experience} XP)
                      </strong>
                    </Title>

                    <Info>{request.information}</Info>
                  </div>
                </Grid>

                <RequestFooter
                  date={new Date(request.requestDate)}
                  showDetails={() =>
                    handleShowDetails({
                      ...request,
                      requester,
                      activity,
                    })
                  }
                  handleAccept={() => onAcceptRequest(request.id)}
                  handleDecline={() => onDeleteRequest(request.id)}
                />
              </RequestItem>
            ))
          ) : (
            <NoRequests />
          )}
        </SRequestsContainer.List>
      )}

      <Modal
        size="md"
        open={openDetails}
        closeModal={handleCloseDetails}
        title="Atividade"
      >
        <ActivityDetails
          request={selectedRequest}
          deleteRequest={onDeleteRequest}
          acceptRequest={onAcceptRequest}
        />
      </Modal>
    </SRequestsContainer>
  );
};

export default ActivityRequestsList;
