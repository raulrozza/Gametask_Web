import React, { memo } from 'react';
import { useFormikContext } from 'formik';

import { Container, LightText, NormalButton, OutlinedButton } from './styles';
import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';

const ColorPreview: React.FC = () => {
  const { values } = useFormikContext<IUpdateGameDTO>();

  return (
    <Container primary={values.primary} secondary={values.secondary}>
      <h3>Title</h3>

      <p>Some text here</p>

      <LightText primary={values.primary} secondary={values.secondary}>
        Some light text
      </LightText>

      <NormalButton
        disabled
        primary={values.primary}
        secondary={values.secondary}
        title=""
      >
        Normal button
      </NormalButton>

      <OutlinedButton
        disabled
        primary={values.primary}
        secondary={values.secondary}
        title=""
      >
        outlined button
      </OutlinedButton>
    </Container>
  );
};

export default memo(ColorPreview);
