import { IGameForm } from 'pages/Lobby/types';

export interface UseCreateGame {
  (props: IGameForm): {
    loading: boolean;
    onSubmit: (values: unknown) => Promise<void>;
  };
}
