import React, { useMemo } from 'react';

import { FieldArrayRenderProps, useField } from 'formik';

import theme from 'config/theme';
import { RemoveButton } from 'modules/gameManagement/view/components';
import { Select } from 'modules/gameManagement/view/pages/RankConfig/components';
import ILevelInfo from 'shared/domain/entities/ILevelInfo';
import IRank from 'shared/domain/entities/IRank';

import { Container, ColorInput, SInput } from './styles';

interface RankItemProps {
  index: number;
  levels: ILevelInfo[];
  handleRemove: FieldArrayRenderProps['handleRemove'];
}

const RankItem: React.FC<RankItemProps> = ({ index, levels, handleRemove }) => {
  const [field] = useField<IRank>(`ranks[${index}]`);

  const options = useMemo(
    () =>
      levels.map(level => ({
        key: String(level.level),
        value: level.level,
      })),
    [levels],
  );

  const color = useMemo(() => field.value.color || theme.palette.primary.main, [
    field.value.color,
  ]);

  return (
    <Container color={color}>
      <RemoveButton onClick={handleRemove(index)} />

      <Select index={index} options={options} />

      <SInput
        placeholder="Nome da patente"
        area="name"
        name={`ranks[${index}].name`}
        color={color}
        fullWidth
      />

      <SInput
        placeholder="Tag"
        name={`ranks[${index}].tag`}
        area="tag"
        color={color}
        fullWidth
      />

      <ColorInput name={`ranks[${index}].color`} />
    </Container>
  );
};

export default RankItem;
