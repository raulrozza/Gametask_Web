import { useFormikContext } from 'formik';
import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';
import React, { memo, useCallback } from 'react';
import defaultPalette from 'config/theme/palette';

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
