import { IAchievement, IActivity, IPlayer } from 'interfaces';

export interface IActivityRequest {
  _id: string;
  requester: IPlayer;
  activity: IActivity;
  completionDate: string;
  information: string;
  requestDate: string;
}

export interface IAchievementRequest {
  _id: string;
  requester: IPlayer;
  achievement: IAchievement;
  information: string;
  requestDate: string;
}

export interface AchievementRequestModalProps {
  request: IAchievementRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}
