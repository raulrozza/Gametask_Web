import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import IRank from 'shared/domain/entities/IRank';

import { Container } from './styles';

interface AddItemButtonProps {
  handlePush(rank: IRank): void;
}

interface IRankValues {
  ranks: IRank[];
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ handlePush }) => {
  const formik = useFormikContext<IRankValues>();

  const onClick = useCallback(() => {
    const { ranks } = formik.values;

    const level = ranks.length ? ranks[ranks.length - 1].level + 1 : 1;

    handlePush({
      level: level,
      tag: '',
      name: '',
      color: '',
    });
  }, [formik.values, handlePush]);

  return (
    <Container type="button" onClick={onClick}>
      <FaPlus />
    </Container>
  );
};

export default AddItemButton;
