import { IAchievement } from '../../../interfaces/api/Achievement';

export interface AchievementCardProps {
  achievement: IAchievement;
  onEdit: (id: string) => void;
  onDelete: () => Promise<void>;
}
