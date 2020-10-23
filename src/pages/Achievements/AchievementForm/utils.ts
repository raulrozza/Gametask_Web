import { FormValues } from './types';

export function getAchievementFormData(
  formValues: Partial<FormValues>,
): FormData {
  const data = new FormData();

  const valuesArray = Object.keys(formValues) as (keyof FormValues)[];

  valuesArray.forEach(key => {
    const value = formValues[key];
    if (value) data.append(key, value);
  });

  return data;
}
