import React, { FC } from "react";

import styles from "./Modal.module.css";

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return <div className={styles.modalBody}>{children}</div>;
};

export default ModalBody;
