import React, { useState, useCallback } from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';
import achievementPlaceholder from 'assets/img/achievements/placeholder.png';

// Components
import { Loading, Modal } from 'shared/view/components';
import {
  AchievementDetails,
  NoRequests,
  RequestsContainer,
  RequestFooter,
} from '..';

// Hooks
import useFetchAchievementRequestsController from 'modules/managePlayers/infra/controllers/useFetchAchievementRequests';
import { useModalController } from 'shared/view/components/Modal';

// Styles
import { RequestItem, Grid, Image, Info, Title } from './styles';

// Types
import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';
import useDeleteAchievementRequestController from 'modules/managePlayers/infra/controllers/useDeleteAchievementRequestController';

const AchievementRequestsList: React.FC = () => {
  const {
    loading,
    achievementRequests,
    fetchAchievementRequests,
  } = useFetchAchievementRequestsController();

  const { deleteAchievementRequest } = useDeleteAchievementRequestController();

  const [
    selectedRequest,
    setSelectedRequest,
  ] = useState<IAchievementRequest | null>(null);

  const [
    openDetails,
    handleOpenDetails,
    handleCloseDetails,
  ] = useModalController();

  const onDeleteRequest = useCallback(
    async (id: string) => {
      const success = await deleteAchievementRequest(id);

      if (success) {
        fetchAchievementRequests();
        handleCloseDetails();
      }
    },
    [deleteAchievementRequest, fetchAchievementRequests, handleCloseDetails],
  );

  const onGrantAchievement = useCallback(
    async (id: string) => {
      const success = 1 + 1 === 2;

      if (success) {
        fetchAchievementRequests();
        handleCloseDetails();
      }
    },
    [fetchAchievementRequests, handleCloseDetails],
  );

  const handleShowDetails = useCallback(
    (request: IAchievementRequest) => {
      setSelectedRequest(request);
      handleOpenDetails();
    },
    [handleOpenDetails],
  );

  return (
    <RequestsContainer>
      {loading ? (
        <Loading />
      ) : (
        <RequestsContainer.List>
          {achievementRequests.length > 0 ? (
            achievementRequests.map(
              ({ requester, achievement, ...request }) => (
                <RequestItem key={request.id}>
                  <Grid>
                    <Image
                      src={requester.user.profile_url || userPlaceholder}
                      alt={requester.user.firstname}
                    />

                    <Image
                      src={achievement.image_url || achievementPlaceholder}
                      alt={achievement.name}
                    />

                    <div>
                      <Title>
                        <strong>{requester.user.firstname}</strong>
                        {` | `}
                        <strong>{achievement.name}</strong>
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
                        achievement,
                      })
                    }
                    handleAccept={() => onGrantAchievement(request.id)}
                    handleDecline={() => onDeleteRequest(request.id)}
                  />
                </RequestItem>
              ),
            )
          ) : (
            <NoRequests />
          )}
        </RequestsContainer.List>
      )}

      <Modal
        size="md"
        open={openDetails}
        closeModal={handleCloseDetails}
        title="Conquista"
      >
        <AchievementDetails
          request={selectedRequest}
          deleteRequest={onDeleteRequest}
          acceptRequest={onGrantAchievement}
        />
      </Modal>
    </RequestsContainer>
  );
};

export default AchievementRequestsList;
