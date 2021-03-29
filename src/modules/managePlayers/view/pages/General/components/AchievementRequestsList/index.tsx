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
import { RequestFooter } from '../../styles';

// Types
import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';

const AchievementRequestsList: React.FC = () => {
  const {
    loading,
    achievementRequests,
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

  const handleDeleteRegister = useCallback(async (id: string) => undefined, []);

  const handleAcceptRegister = useCallback(async (id: string) => undefined, []);

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
                <li className="request" key={request.id}>
                  <section className="main">
                    <img
                      src={requester.user.profile_url || userPlaceholder}
                      alt={requester.user.firstname}
                    />

                    <img
                      src={achievement.image_url || achievementPlaceholder}
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
                        onClick={() => handleAcceptRegister(request.id)}
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
          deleteRequest={handleDeleteRegister}
          acceptRequest={handleAcceptRegister}
        />
      </Modal>
    </RequestsContainer>
  );
};

export default AchievementRequestsList;
