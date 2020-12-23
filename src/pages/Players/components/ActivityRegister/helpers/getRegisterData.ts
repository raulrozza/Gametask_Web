import { IUser } from 'interfaces';
import { IActivityRequest } from 'pages/Players/types';

export default function getRegisterData(
  user: IUser,
  request: IActivityRequest,
  registerId: string,
): unknown {
  const data = {
    userId: user._id,
    playerId: request.requester._id,
    activityId: request.activity._id,
    registerId,
    experience: request.activity.experience,
    completionDate: request.completionDate,
  };

  return data;
}
