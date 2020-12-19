import { IActivity } from 'interfaces';

export interface UseActivites {
  (): {
    loading: boolean;
    activities: IActivity[];
  };
}
