import IAchievement from 'modules/dashboard/domain/entities/IAchievement';
import ITitle from 'modules/dashboard/domain/entities/ITitle';
import { useMemo, useState } from 'react';

interface IAchievementValues {
  id: string;
  name: string;
  description: string;
  title: string;
  titleName: string;
  image?: string | File;
}

interface UseEditAchievementSelector {
  achievementValues?: IAchievementValues;
  openEditorWith(achievement?: IAchievement): void;
}

export default function useEditAchievementSelector(): UseEditAchievementSelector {
  const [selectedAchievement, setSelectedAchievement] = useState<
    IAchievement | undefined
  >();

  const achievementValues: IAchievementValues | undefined = useMemo(() => {
    if (!selectedAchievement) return;

    const title = selectedAchievement.title as ITitle | undefined;

    return {
      id: selectedAchievement.id,
      name: selectedAchievement.name,
      description: selectedAchievement.description,
      title: title?.id || '',
      titleName: title?.name || '',
      image: selectedAchievement.image_url,
    };
  }, [selectedAchievement]);

  return {
    achievementValues,
    openEditorWith: setSelectedAchievement,
  };
}
