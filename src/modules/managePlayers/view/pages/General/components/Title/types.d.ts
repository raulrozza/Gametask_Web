import { ITitle } from 'interfaces';

export interface TitleProps {
  title: ITitle;
  onDelete: (id: string) => void;
}

export interface TitleElementContainerProps {
  editing: boolean;
}
