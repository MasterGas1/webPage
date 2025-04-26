import React, { FC } from "react";

import styles from "./Modal.module.css";

interface ModalHeaderProps {
  children: React.ReactNode;
}

const ModalHeader: FC<ModalHeaderProps> = ({ children }) => {
  return (
    <div>
      <header className={styles.modalHeader}>{children}</header>
    </div>
  );
};

export default ModalHeader;
