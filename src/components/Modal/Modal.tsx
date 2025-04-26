import React, { FC } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <div
      className={`${styles.modalContainer} ${isOpen && styles.show}`}
      onClick={onClose}
    >
      {children}
    </div>
  );
};

export default Modal;
