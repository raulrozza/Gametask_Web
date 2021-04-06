export default interface IUpdateGameDTO {
  name: string;
  description: string;
  image: File | string;
  primary: string;
  secondary: string;
}
