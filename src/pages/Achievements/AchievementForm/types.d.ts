import { IAchievement } from '../../../interfaces/api/Achievement';

export interface AchievementFormProps {
  achievement: IAchievement | null;
  submitCallback: () => void;
}

export interface FormValues {
  name: string;
  description: string;
  title: string;
  image?: string | null;
}
