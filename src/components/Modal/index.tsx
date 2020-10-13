import React, { useRef, useEffect } from 'react';

// Icons
import { FaTimes } from 'react-icons/fa';

// Types
import { ModalProps } from './types';

// Styles
import { Background, Container } from './styles';

const Modal: React.FC<ModalProps> = ({
  title = 'Modal',
  closeModal,
  children,
  size = 'md',
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundRef.current)
      backgroundRef.current.addEventListener('click', function (
        event: MouseEvent,
      ) {
        if (event.target && event.target === this) closeModal();
      });
  }, [closeModal]);

  return (
    <Background ref={backgroundRef}>
      <Container size={size}>
        <div className="modal-title">
          <h2>{title}</h2>

          <button className="close" type="button" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-children">{children}</div>
      </Container>
    </Background>
  );
};

export default Modal;
