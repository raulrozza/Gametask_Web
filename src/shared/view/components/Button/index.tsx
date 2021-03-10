import React, { memo, ButtonHTMLAttributes } from 'react';

import { ChildrenContainer, Spinner, StyledButton, Text } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean;
  loading?: boolean;
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

      {typeof children === 'string' ? (
        <Text $visible={!loading}>{children}</Text>
      ) : (
        <ChildrenContainer $visible={!loading}>{children}</ChildrenContainer>
      )}
    </StyledButton>
  );
};

export default memo(Button);
