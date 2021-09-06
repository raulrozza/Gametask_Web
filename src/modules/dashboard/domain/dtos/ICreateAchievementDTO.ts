export default interface ICreateAchievementDTO {
  name: string;
  description: string;
  title?: string;
  image?: File | string;
}
