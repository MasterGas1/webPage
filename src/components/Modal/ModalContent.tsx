import React, { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";

import styles from "./Modal.module.css";
import Button from "../Button/Button";

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  onOpenChange?: () => void;
}

const ModalContent: FC<ModalContentProps> = ({
  children,
  className,
  onOpenChange,
}) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <section
      className={`${styles.modalContent} ${className} `}
      onClick={stopPropagation}
    >
      <div className={styles.buttonClosePosition}>
        <Button
          icon={<IoCloseOutline size={25} color="var(--principal-color)" />}
          className={styles.buttonClose}
          onClick={onOpenChange}
        />
      </div>
      {children}
    </section>
  );
};

export default ModalContent;
