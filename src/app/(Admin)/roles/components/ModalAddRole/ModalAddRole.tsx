import React, { FC, useState } from "react";

import styles from "./ModalAddRole.module.css";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components";
import { useForm } from "@/hook/useForm";
import { AddRoleInterface } from "../../interfaces/RoleInterface";

interface ModalAddRoleInterface {
  isOpen: boolean;
  isLoading: boolean;
  onOpenChange: () => void;
  addRole: (body: AddRoleInterface) => void;
}

const ModalAddRole: FC<ModalAddRoleInterface> = ({
  isOpen,
  isLoading,
  onOpenChange,
  addRole,
}) => {
  const initialValues = {
    name: "",
    description: "",
  };

  const validations = {
    name: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?!\s*$).+/,
    },
    description: {
      errorMessage: "Campo requerido",
      regexValidation: /^(?!\s*$).+/,
    },
  };

  const onSubmit = (body: AddRoleInterface) => {
    try {
      addRole(body);
      resetForm();
      onOpenChange();
    } catch (error) {

    }
  };

  const { name, description, errors, onChange, resetForm, handleSubmit } =
    useForm(initialValues, validations, onSubmit);

  const onClose = () => {
    if (!isLoading) {
      resetForm();
      onOpenChange();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent onOpenChange={onClose}>
        <ModalHeader>Agregar Nuevo Role</ModalHeader>
        <ModalBody>
          <div className={styles.formAddRoleContainer}>
            <Input
              value={name}
              onChange={(e) => onChange(e.target.value, "name")}
              variants="bordered"
              label="Nombre:"
              required
              errorMessage={errors.name}
            />
            <Input
              value={description}
              onChange={(e) => onChange(e.target.value, "description")}
              variants="bordered"
              label="Descripción:"
              required
              errorMessage={errors.description}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className={styles.buttonsFormAddRole}>
            <Button
              label="Cancelar"
              backgroundColor="error"
              onClick={onClose}
            />
            <Button label="Agregar" onClick={() => handleSubmit()} />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddRole;
