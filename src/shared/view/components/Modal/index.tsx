import React, { useRef, useEffect } from 'react';

// Icons
import { FaTimes } from 'react-icons/fa';

// Styles
import { Background, Container } from './styles';

interface ModalProps {
  open: boolean;
  closeModal: () => void;
  title?: string;
  size?: 'md' | 'sm' | 'lg';
}

const Modal: React.FC<ModalProps> = ({
  open,
  title = 'Modal',
  closeModal,
  children,
  size = 'md',
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundRef.current)
      backgroundRef.current.addEventListener(
        'click',
        function (event: MouseEvent) {
          if (event.target && event.target === this) closeModal();
        },
      );
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
