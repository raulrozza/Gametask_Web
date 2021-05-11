export default interface ICryptoProvider {
  encrypt(data: unknown): string;
}
