// Hooks
import { useCallback, useMemo, useRef } from 'react';
import { useAuth } from 'hooks';

// Services
import { encrypting } from 'services';

// Utils
import { displayInfoMessage } from 'utils';
import { UseShare } from '../types';

const useShare: UseShare = ({ gameId }) => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const cipher = useMemo(() => {
    const SECRET = String(process.env.REACT_APP_SECRET);

    const cipher = encrypting.encrypt({ gameId, inviter: user?._id }, SECRET);

    return cipher;
  }, [gameId, user]);

  const handleCopyToClipboard = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.select();
      document.execCommand('copy');

      displayInfoMessage('Copiado para a área de transferência.');
    }
  }, []);

  return {
    cipher,
    inputRef,
    handleCopyToClipboard,
  };
};

export default useShare;
