import React from 'react';

// Hooks
import { useShare } from './hooks';

// Icons
import { MdContentCopy } from 'react-icons/md';

// Styles
import { Container } from './styles';

// Types
import { ShareProps } from './types';

const Share: React.FC<ShareProps> = ({ gameId }) => {
  const { cipher, inputRef, handleCopyToClipboard } = useShare({ gameId });

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
