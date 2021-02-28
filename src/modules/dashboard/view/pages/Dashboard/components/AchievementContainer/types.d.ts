import { IAchievement } from 'interfaces';

export interface UseAchievements {
  (): {
    loading: boolean;
    achievements: IAchievement[];
  };
}
