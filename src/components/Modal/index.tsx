import React from 'react';
import PropTypes from 'prop-types';

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
  return (
    <Background>
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

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Modal.defaultProps = {
  closeModal: () => {
    console.log('Not implemented.');
  },
};

export default Modal;
