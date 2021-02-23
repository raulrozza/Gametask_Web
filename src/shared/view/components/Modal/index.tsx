import React, { useRef, useEffect, useState, useCallback } from 'react';

// Icons
import { FaTimes } from 'react-icons/fa';

// Styles
import {
  Background,
  ChildrenContainer,
  CloseButton,
  Container,
  ModalTitle,
} from './styles';

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
    <Background ref={backgroundRef} open={open}>
      <Container size={size}>
        <ModalTitle>
          <h2>{title}</h2>

          <CloseButton type="button" onClick={closeModal}>
            <FaTimes />
          </CloseButton>
        </ModalTitle>

        <ChildrenContainer>{children}</ChildrenContainer>
      </Container>
    </Background>
  );
};

type UseModalController = [boolean, () => void, () => void];

export function useModalController(): UseModalController {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);

  const closeModal = useCallback(() => setOpen(false), []);

  return [open, openModal, closeModal];
}

export default Modal;
