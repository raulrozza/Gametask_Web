import { RefObject, useCallback, useMemo, useRef } from 'react';

import makeCryptoProvider from 'modules/user/providers/CryptoProvider';
import { useSessionContext, useToastContext } from 'shared/view/contexts';

interface UseShareGameController {
  (props: { gameId: string }): {
    cipher: string;
    inputRef: RefObject<HTMLInputElement>;
    handleCopyToClipboard: () => void;
  };
}

const useShareGameController: UseShareGameController = ({ gameId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cryptoProvider = useMemo(() => makeCryptoProvider(), []);
  const session = useSessionContext();
  const toast = useToastContext();

  const cipher = useMemo(
    () => cryptoProvider.encrypt({ gameId, inviter: session.userData.id }),
    [cryptoProvider, gameId, session.userData.id],
  );

  const handleCopyToClipboard = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.select();
      document.execCommand('copy');

      toast.showInfo('Copiado para a área de transferência.');
    }
  }, [toast]);

  return {
    cipher,
    inputRef,
    handleCopyToClipboard,
  };
};

export default useShareGameController;
