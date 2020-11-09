import { FormikErrors } from 'formik';

// Types
import { ITitle } from '../../../interfaces/api/Title';
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

export function validateFormTitle(
  values: FormValues,
  title: ITitle | null,
): FormikErrors<FormValues> {
  const error = {} as FormikErrors<FormValues>;

  if (values.title.length > 0 && !title) {
    error.title = 'Adicione um título existente.';
  }

  return error;
}
