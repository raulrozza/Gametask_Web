import React, { useState, useCallback } from 'react';

// Assets
import userPlaceholder from 'assets/img/users/placeholder.png';
import achievementPlaceholder from 'assets/img/achievements/placeholder.png';

// Components
import { Loading, Modal } from 'shared/view/components';
import RequestModal from './RequestModal';
import { NoRequests, RequestsContainer } from '..';

// Hooks
import useFetchAchievementRequestsController from 'modules/managePlayers/infra/controllers/useFetchAchievementRequests';
import { useModalController } from 'shared/view/components/Modal';

// Icons
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

// Styles
import { RequestItem, Grid, Image, Info, Title } from './styles';
import { RequestFooter } from '../../styles';

// Types
import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';

const AchievementRequestsList: React.FC = () => {
  const {
    loading,
    achievementRequests,
    fetchAchievementRequests,
  } = useFetchAchievementRequestsController();

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
      const success = 1 + 1 === 2;

      if (success) {
        fetchAchievementRequests();
        handleCloseDetails();
      }
    },
    [fetchAchievementRequests, handleCloseDetails],
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
                        onClick={() => onGrantAchievement(request.id)}
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
        <RequestModal
          request={selectedRequest}
          deleteRequest={onDeleteRequest}
          acceptRequest={onGrantAchievement}
        />
      </Modal>
    </RequestsContainer>
  );
};

export default AchievementRequestsList;
