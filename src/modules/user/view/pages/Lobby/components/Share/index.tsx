import React from 'react';

// Hooks
import useShareGameController from 'modules/user/infra/controllers/useShareGameController';

// Icons
import { MdContentCopy } from 'react-icons/md';

// Styles
import { CipherInput, Container, CopyButton, InputGroup } from './styles';

interface ShareProps {
  gameId: string;
}

const Share: React.FC<ShareProps> = ({ gameId }) => {
  const { cipher, inputRef, handleCopyToClipboard } = useShareGameController({
    gameId,
  });

  return (
    <Container>
      <span>Código para convite:</span>

      <InputGroup>
        <CipherInput type="text" ref={inputRef} value={cipher} readOnly />

        <CopyButton
          type="button"
          onClick={handleCopyToClipboard}
          title="Copiar para a área de transferência"
        >
          <MdContentCopy />
        </CopyButton>
      </InputGroup>
    </Container>
  );
};

export default Share;
