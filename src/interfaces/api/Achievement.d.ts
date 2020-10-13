import { ITitle } from './Title';

export interface IAchievement {
  _id: string;
  name: string;
  description: string;
  image?: string | null;
  image_url: string;
  title?: ITitle | null;
}
