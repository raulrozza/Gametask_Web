import IActivity from 'modules/dashboard/domain/entities/IActivity';
import { useMemo, useState } from 'react';

interface IActivityValues {
  id: string;
  name: string;
  experience: string;
  description?: string;
  dmRules?: string;
}

interface UseEditActivitySelector {
  activityValues?: IActivityValues;
  openEditorWith(achievement?: IActivity): void;
}

export default function useEditActivitySelector(): UseEditActivitySelector {
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >();

  const activityValues: IActivityValues | undefined = useMemo(() => {
    if (!selectedActivity) return;

    return {
      id: selectedActivity.id,
      name: selectedActivity.name,
      experience: String(selectedActivity.experience),
      description: selectedActivity.description,
      dmRules: selectedActivity.dmRules,
    };
  }, [selectedActivity]);

  return {
    activityValues,
    openEditorWith: setSelectedActivity,
  };
}
