import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';

export interface ActivityModalProps {
  request: IActivityRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}
