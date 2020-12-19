import React, { useRef, useCallback } from 'react';

// Hooks
import { useAuth } from '../../../hooks/contexts/useAuth';

// Icons
import { MdContentCopy } from 'react-icons/md';

// Services
import { encrypting } from '../../../services';

// Styles
import { Container } from './styles';

// Types
import { ShareProps } from './types';

// Utils
import displayInfoMessage from '../../../utils/messages/displayInfoMessage';

const Share: React.FC<ShareProps> = ({ gameId }) => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const SECRET = process.env.REACT_APP_SECRET || '';

  const handleCopyToClipboard = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.select();
      document.execCommand('copy');

      displayInfoMessage('Copiado para a área de transferência.');
    }
  }, []);

  if (!user) return null;

  const cipher = encrypting.encrypt({ gameId, inviter: user._id }, SECRET);

  return (
    <Container>
      <span>Código para convite:</span>

      <div className="input-group">
        <input type="text" ref={inputRef} value={cipher} readOnly />

        <button
          type="button"
          onClick={handleCopyToClipboard}
          title="Copiar para a área de transferência"
        >
          <MdContentCopy />
        </button>
      </div>
    </Container>
  );
};

export default Share;
