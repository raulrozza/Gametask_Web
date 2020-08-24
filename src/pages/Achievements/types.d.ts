import { IAchievement } from 'game';

export interface ContainerProps {
  reduced: boolean;
}

export interface TitleOptionsProps {
  visible: boolean;
}

export interface AchievementFormProps {
  achievement: IAchievement | null;
  submitCallback: (id: string) => void;
}

export interface FormValues {
  name: string;
  description: string;
  title: string;
  image?: string | null;
}
