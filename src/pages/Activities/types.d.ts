export interface ActivityFormProps {
  activity: IActivity | null;
  submitCallback: (id: string) => void;
}
