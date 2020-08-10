import React from 'react';
import PropTypes from 'prop-types';

// Icons
import { FaTimes } from 'react-icons/fa';

import './styles.css';

interface ModalProps {
  title?: string;
  closeModal?: () => void;
  show?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, closeModal, children }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <div className="modal-title">
          <h2>{title}</h2>
          <button className="close" type="button" onClick={closeModal}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-children">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: 'Modal',
  closeModal: () => {
    console.log('Not implemented.');
  },
  show: false,
  children: <div />,
};

export default Modal;