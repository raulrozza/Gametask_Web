import { IRank } from 'game';

export interface SideNavProps {
  shown: boolean;
}

export interface TabItemProps {
  active: boolean;
}

export interface RankItemProps {
  backgroundColor: string;
  textColor: string;
}

export interface InfoFormValues {
  name: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
    [key: string]: string;
  };
  image: string | null;
}

export interface ILevelInfo {
  requiredExperience: number;
  title?: string;
  [key: string]: number | string;
}

export interface IndexableRank extends IRank {
  [key: string]: string | number;
}
