import React, { FC } from "react";

import styles from "./Modal.module.css";

interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return <footer className={styles.modalFooter}>{children}</footer>;
};

export default ModalFooter;
