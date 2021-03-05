import { useCallback, useState } from 'react';

interface UseTitleOptionsController {
  visible: boolean;
  hide(): void;
  show(): void;
}

export default function useTitleOptionsController(): UseTitleOptionsController {
  const [visible, setVisible] = useState(false);

  const hide = useCallback(() => setVisible(false), []);

  const show = useCallback(() => setVisible(true), []);

  return {
    visible,
    hide,
    show,
  };
}
