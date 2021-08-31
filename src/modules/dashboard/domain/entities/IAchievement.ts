import ITitle from 'modules/dashboard/domain/entities/ITitle';

export default interface IAchievement {
  id: string;
  name: string;
  description: string;
  title?: string | ITitle;
  image?: string;
  image_url?: string;
  game: string;
}
