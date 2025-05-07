import React, { FC } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components";

interface ModalConfirmationProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

const ModalConfirmation: FC<ModalConfirmationProps> = ({
  title,
  description,
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onOpenChange}>
      <ModalContent onOpenChange={onOpenChange}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button
            label="Cancelar"
            backgroundColor="error"
            onClick={onOpenChange}
          />
          <Button label="Aceptar" onClick={onConfirm} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmation;
