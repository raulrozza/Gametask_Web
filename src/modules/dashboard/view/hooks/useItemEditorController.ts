import { useCallback, useState } from 'react';

interface UseItemEditorController {
  visible: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export default function useItemEditorController(): UseItemEditorController {
  const [visible, setVisible] = useState(false);

  const toggle = useCallback(() => setVisible(visible => !visible), []);

  const open = useCallback(() => setVisible(true), []);

  const close = useCallback(() => setVisible(false), []);

  return {
    visible,
    toggle,
    open,
    close,
  };
}
