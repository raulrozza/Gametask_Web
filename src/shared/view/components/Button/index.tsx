import React, { ButtonHTMLAttributes } from 'react';

import { Spinner, StyledButton, Text } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean;
  loading?: boolean;
  children?: string;
}

const Button: React.FC<ButtonProps> = ({
  outlined = false,
  loading = false,
  disabled,
  children,
  ...buttonProps
}) => {
  return (
    <StyledButton
      outline={outlined}
      {...buttonProps}
      disabled={disabled || loading}
    >
      <Spinner
        $visible={loading}
        width={16}
        height={16}
        type="spinningBubbles"
      />

      <Text $visible={!loading}>{children}</Text>
    </StyledButton>
  );
};

export default Button;
