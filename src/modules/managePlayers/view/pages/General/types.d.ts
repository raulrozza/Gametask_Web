import IAchievementRequest from 'modules/managePlayers/entities/IAchievementRequest';

export interface AchievementRequestModalProps {
  request: IAchievementRequest | null;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}
