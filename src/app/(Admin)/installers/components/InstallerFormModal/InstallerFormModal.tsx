import React, { FC, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@/components";

import styles from "./InstallerFormModal.module.css";

import { useForm } from "@/hook/useForm";

import {
  InstallerInterface,
  InstallerRequestInterface,
} from "@/app/(Admin)/installers/interfaces/installerInterface";

import {
  userStatusEnum,
  userStatusOptions,
  userStatusReverseEnum,
} from "@/data/userStatusEnum";

interface CreateInstallerModalProps {
  isOpen: boolean;
  installer?: InstallerInterface;
  onOpenChange: () => void;
  onSubmit: (form: InstallerRequestInterface) => void;
  onUpdate: (form: InstallerRequestInterface) => void;
}

const InstallerModalForm: FC<CreateInstallerModalProps> = ({
  isOpen,
  installer,
  onOpenChange,
  onUpdate,
  onSubmit,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    rfc: "",
    status: "",
  };

  const validations = {
    name: {
      errorMessage: "El nombre es requerido",
      regexValidation: /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/,
    },
    lastName: {
      errorMessage: "El apellido es requerido",
      regexValidation: /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/,
    },
    email: {
      errorMessage: "El email es requerido",
      regexValidation:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    rfc: {
      errorMessage: "El RFC es requerido",
      regexValidation: /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/,
    },
  };

  const onHandleSubmit = (form: InstallerRequestInterface) => {
    if (installer) {
      onUpdate(form);
    } else {
      const { status, ...createForm } = form;
      onSubmit(createForm);
    }
  };

  const {
    name,
    lastName,
    email,
    rfc,
    status,
    errors,
    onChange,
    handleSubmit,
    resetForm,
    updateValues,
  } = useForm(initialValues, validations, onHandleSubmit);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (installer) {
      updateValues({
        name: installer.name,
        lastName: installer.lastName,
        email: installer.email,
        rfc: installer.rfc,
        status: installer.status,
      });
    } else {
      resetForm();
    }
  }, [installer]);

  return (
    <Modal isOpen={isOpen} onClose={onOpenChange}>
      <ModalContent className={styles.modalContent} onOpenChange={onOpenChange}>
        <ModalHeader>
          {installer ? "Editar instalador" : "Crear instalador"}
        </ModalHeader>

        <ModalBody>
          <Input
            label="Nombre(s)"
            variants="bordered"
            onChange={(e) => onChange(e.target.value, "name")}
            value={name}
            errorMessage={errors.name}
          />

          <Input
            label="Apellido(s)"
            variants="bordered"
            onChange={(e) => onChange(e.target.value, "lastName")}
            value={lastName}
            errorMessage={errors.lastName}
          />

          <Input
            label="Correo"
            variants="bordered"
            onChange={(e) => onChange(e.target.value, "email")}
            value={email}
            type="email"
            errorMessage={errors.email}
          />

          <Input
            label="RFC"
            variants="bordered"
            onChange={(e) => onChange(e.target.value, "rfc")}
            value={rfc}
            errorMessage={errors.rfc}
          />

          {installer && (
            <Select
              label="Estatus"
              variants="bordered"
              value={userStatusEnum[status as keyof typeof userStatusEnum]}
              onChange={(e) => {
                onChange(
                  userStatusReverseEnum[
                    e as keyof typeof userStatusReverseEnum
                  ],
                  "status"
                );
              }}
            >
              {userStatusOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            label="Cancelar"
            backgroundColor="error"
            onClick={onOpenChange}
          />
          <Button label="Guardar" onClick={handleSubmit} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InstallerModalForm;
