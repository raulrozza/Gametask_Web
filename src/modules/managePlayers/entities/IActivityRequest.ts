interface IUser {
  firstname: string;
  lastname: string;
  profile_url?: string;
}

interface IRequester {
  id: string;
  user: IUser;
}

interface IActivity {
  id: string;
  name: string;
  experience: number;
  dmRules?: string;
}

export default interface IActivityRequest {
  id: string;
  information: string;
  requestDate: string;
  completionDate: string;
  requester: IRequester;
  activity: IActivity;
}
