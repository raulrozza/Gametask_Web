export interface GameCardProps {
  hasInfo?: bool;
}

export interface GameFormProps {
  onSuccess: () => Promise<void>;
  closeModal: () => void;
}

export interface GameFormValues {
  name: string;
  description: string;
  image: string | null;
}
