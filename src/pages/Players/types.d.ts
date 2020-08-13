export interface IRequest {
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

export interface RequestModalProps {
  request: IRequest;
  deleteRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
}
