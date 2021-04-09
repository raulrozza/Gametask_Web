import { IRank } from 'interfaces/api/Rank';

export interface RankItemProps {
  backgroundColor: string;
  textColor: string;
}

export interface IndexableRank extends IRank {
  [key: string]: string | number;
}
