export interface IGameCard {
  hasInfo?: bool;
}

export interface IGameForm {
  onSuccess: () => Promise<void>;
  closeModal: () => void;
}

export interface IGameValues {
  name: string;
  description: string;
  image: string | null;
}
