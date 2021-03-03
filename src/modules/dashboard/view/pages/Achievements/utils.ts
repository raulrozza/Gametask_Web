import { IAchievement } from 'interfaces/api/Achievement';

export function findAchievementById(
  achievements: IAchievement[],
  id: string,
): IAchievement | undefined {
  const foundAchievement = achievements.find(
    achievement => achievement._id === id,
  );

  return foundAchievement;
}
