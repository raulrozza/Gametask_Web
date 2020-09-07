import { IPlayer, IActivity, IAchievement, ITitle } from 'game';

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

export interface ActivityRequestModalProps {
  request: IActivityRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}

export interface AchievementRequestModalProps {
  request: IAchievementRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}

export interface TitleElementProps {
  title: ITitle;
  onDelete: (id: string) => void;
}

export interface TitleElementContainerProps {
  editing: boolean;
}
