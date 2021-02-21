export default interface IToastProvider {
  showInfo(message: string): void;
  showSuccess(message: string): void;
  showError(message: string): void;
}
