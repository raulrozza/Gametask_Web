import React, { useState, useCallback } from 'react';

// Assets
import achievementPlaceholder from 'assets/img/achievements/placeholder.png';
import userPlaceholder from 'assets/img/users/placeholder.png';

// Components
import IGrantAchievementDTO from 'modules/managePlayers/domain/dtos/IGrantAchievementDTO';
import IAchievementRequest from 'modules/managePlayers/domain/entities/IAchievementRequest';
import useDeleteAchievementRequestController from 'modules/managePlayers/infra/controllers/useDeleteAchievementRequestController';
import useFetchAchievementRequestsController from 'modules/managePlayers/infra/controllers/useFetchAchievementRequests';
import useGrantAchievementController from 'modules/managePlayers/infra/controllers/useGrantAchievementController';
import { Loading, Modal } from 'shared/view/components';
import { useModalController } from 'shared/view/components/Modal';

import {
  AchievementDetails,
  NoRequests,
  RequestsContainer,
  RequestFooter,
} from '..';

// Hooks

// Styles
import { RequestItem, Grid, Image, Info, Title } from './styles';

// Types

const AchievementRequestsList: React.FC = () => {
  const {
    loading,
    achievementRequests,
    fetchAchievementRequests,
  } = useFetchAchievementRequestsController();

  const { deleteAchievementRequest } = useDeleteAchievementRequestController();

  const { grantAchievement } = useGrantAchievementController();

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
    async (data: IGrantAchievementDTO) => {
      const success = await grantAchievement(data);

      if (success) {
        fetchAchievementRequests();
        handleCloseDetails();
      }
    },
    [fetchAchievementRequests, grantAchievement, handleCloseDetails],
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
                    handleAccept={() =>
                      onGrantAchievement({
                        achievementId: achievement.id,
                        playerId: requester.id,
                        userId: requester.user.id,
                        requestId: request.id,
                      })
                    }
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
