export default interface IEditAchievementDTO {
  id: string;
  name: string;
  description: string;
  title?: string;
  image?: File | string;
}
