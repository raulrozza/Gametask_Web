export interface IActivityRequest {
  _id: string;
  requester: {
    _id: string;
    firstname: string;
    lastname: string;
    image?: string | null;
    profile_url: string;
  };
  activity: {
    _id: string;
    name: string;
    experience: number;
    dmRules?: string | null;
  };
  completionDate: string;
  information: string;
  requestDate: string;
}

export interface IAchievementRequest {
  _id: string;
  requester: {
    _id: string;
    firstname: string;
    lastname: string;
    image?: string | null;
    profile_url: string;
  };
  achievement: {
    _id: string;
    name: string;
    description: string;
    image?: string;
    image_url: string;
  };
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
