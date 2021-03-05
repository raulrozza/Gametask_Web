import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseTitleOptionsController {
  menuRef: RefObject<HTMLDivElement>;
  visible: boolean;
  hide(force?: boolean): void;
  show(): void;
}

export default function useTitleOptionsController(): UseTitleOptionsController {
  const menuRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.addEventListener('mouseenter', () =>
        setMenuHovered(true),
      );

      menuRef.current.addEventListener('mouseleave', () =>
        setMenuHovered(false),
      );
    }
  }, []);

  const hide = useCallback(
    (force = false) => {
      if (force || !menuHovered) setVisible(false);
    },
    [menuHovered],
  );

  const show = useCallback(() => setVisible(true), []);

  return {
    menuRef,
    visible,
    hide,
    show,
  };
}
