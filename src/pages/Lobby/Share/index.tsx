import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import crypto from 'crypto-js';

// Hooks
import { useAuth } from '../../../hooks/contexts/useAuth';

// Icons
import { MdContentCopy } from 'react-icons/md';

// Styles
import { Container } from './styles';

// Types
import { IShare } from '../types';
import { toast } from 'react-toastify';

const Share: React.FC<IShare> = ({ gameId }) => {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const SECRET = process.env.REACT_APP_SECRET || '';

  const handleCopyToClipboard = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.select();
      document.execCommand('copy');

      toast.info('Copiado para a área de transferência.');
    }
  }, []);

  if (!user) return null;

  const cipher = crypto.AES.encrypt(
    JSON.stringify({ gameId, inviter: user._id }),
    SECRET,
  ).toString();

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

Share.propTypes = {
  gameId: PropTypes.string.isRequired,
};

export default Share;
