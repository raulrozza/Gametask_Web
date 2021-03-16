import { ITitle } from 'interfaces';

export interface UseTitle {
  (): {
    titles: ITitle[];
    loading: boolean;
    handleAddTitle: () => Promise<void>;
    deleteCallback: (id: string) => void;
  };
}
