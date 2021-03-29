interface IUser {
  firstname: string;
  lastname: string;
  profile_url?: string;
}

interface IRequester {
  id: string;
  user: IUser;
}

interface IAchievement {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
  title?: {
    id: string;
    name: string;
  };
}

export default interface IAchievementRequest {
  id: string;
  requester: IRequester;
  achievement: IAchievement;
  information: string;
  requestDate: string;
}
