export default interface IUpdateGameDTO {
  name: string;
  description: string;
  image: File | string;
  theme: {
    primary: string;
    secondary: string;
  };
}
