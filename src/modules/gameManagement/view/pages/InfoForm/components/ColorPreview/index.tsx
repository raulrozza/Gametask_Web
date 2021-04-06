import React from 'react';
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

      <NormalButton primary={values.primary} secondary={values.secondary}>
        Normal button
      </NormalButton>

      <OutlinedButton primary={values.primary} secondary={values.secondary}>
        outlined button
      </OutlinedButton>
    </Container>
  );
};

export default ColorPreview;
