import { IActivityRequest } from 'pages/Players/types';

export interface ActivityModalProps {
  request: IActivityRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}
