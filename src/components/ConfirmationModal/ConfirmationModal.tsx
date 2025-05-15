import React, { FC } from "react";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalHeader from "../Modal/ModalHeader";
import Button from "../Button/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  header: string;
  content: string;
  onOpenChange: () => void;
  onClickConfirmation: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  header,
  content,
  onOpenChange,
  onClickConfirmation,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onOpenChange}>
      <ModalContent onOpenChange={onOpenChange}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button
            label="Cancelar"
            onClick={onOpenChange}
            backgroundColor="error"
          />
          <Button
            label="Aceptar"
            onClick={() => {
              onClickConfirmation();
              onOpenChange();
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
