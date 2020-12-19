// Hooks
import { useEffect, useState } from 'react';

// Services
import { api } from 'services';

// Types
import { IAchievement } from 'interfaces';

// Utils
import { handleApiErrors } from 'utils';
import { UseAchievements } from '../types';

const useAchievements: UseAchievements = () => {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.instance.get('/achievement');

        setAchievements(data);
        setLoading(false);
      } catch (error) {
        handleApiErrors(error);
      }
    })();
  }, []);

  return {
    achievements,
    loading,
  };
};

export default useAchievements;
