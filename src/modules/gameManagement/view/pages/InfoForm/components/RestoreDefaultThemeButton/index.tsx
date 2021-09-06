import React, { memo, useCallback } from 'react';

import { useFormikContext } from 'formik';

import defaultPalette from 'config/theme/palette';
import IUpdateGameDTO from 'modules/gameManagement/domain/dtos/IUpdateGameDTO';

import { Button } from './styles';

const RestoreDefaultThemeButton: React.FC = () => {
  const formik = useFormikContext<IUpdateGameDTO>();

  const handleClick = useCallback(() => {
    formik.setValues(values => ({
      ...values,
      primary: defaultPalette.primary.main,
      secondary: defaultPalette.secondary.main,
    }));
  }, [formik]);

  return (
    <Button onClick={handleClick} type="button">
      Restaurar tema padrão
    </Button>
  );
};

export default memo(RestoreDefaultThemeButton);
