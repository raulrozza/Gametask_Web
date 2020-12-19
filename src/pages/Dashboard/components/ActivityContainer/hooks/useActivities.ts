// Hooks
import { useEffect, useState } from 'react';

// Services
import { api } from 'services';

// Types
import { IActivity } from 'interfaces';
import { UseActivites } from '../types';

// Utils
import { handleApiErrors } from 'utils';

const useActivities: UseActivites = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.instance.get('/activity');

        setActivities(data);
        setLoading(false);
      } catch (error) {
        handleApiErrors(error);
      }
    })();
  }, []);

  return { loading, activities };
};

export default useActivities;
