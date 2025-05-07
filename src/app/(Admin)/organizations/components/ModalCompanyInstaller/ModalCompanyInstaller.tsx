import React, { useContext } from "react";

import GroupForm from "@/components/GroupForm/GroupForm";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components";
import CustomTextField from "../../../../../components/CustomTextField/CustomTextField";

import { Context as ContextInstaller } from "@/context/companyInstallerContext";

import styles from "./ModalCompanyInstaller.module.css";

interface ModalInstallerProps {
  isOpen: boolean;
  status: string;
  onOpenChange: () => void;
}

const ModalCompanyInstaller = ({
  isOpen,
  status,
  onOpenChange,
}: ModalInstallerProps) => {
  const {
    state: { companyInstaller },
    changeStatus,
  } = useContext(ContextInstaller);

  return (
    <Modal isOpen={isOpen} onClose={onOpenChange}>
      <ModalContent className={styles.modalContent} onOpenChange={onOpenChange}>
        <ModalHeader>Información de la organización</ModalHeader>
        <ModalBody>
          <GroupForm name="Datos personales">
            <CustomTextField
              label="Nombre(s):"
              data={companyInstaller?.ownerUserId.name}
            />

            <CustomTextField
              label="Apellido(s):"
              data={companyInstaller?.ownerUserId.lastName}
            />

            <CustomTextField
              label="RFC:"
              data={companyInstaller?.ownerUserId.rfc}
            />

            <CustomTextField
              label="Correo:"
              data={companyInstaller?.ownerUserId.email}
            />
          </GroupForm>
          <br />

          <GroupForm name="Datos de la empresa">
            <CustomTextField
              label="Nombre de la empresa:"
              data={companyInstaller?.companyName}
            />

            <CustomTextField
              label="Numero de telefonico:"
              data={companyInstaller?.phoneNumber}
            />

            <CustomTextField
              label="Numero Patronal IMSS:"
              data={companyInstaller?.IMSSNumber}
            />

            <CustomTextField
              label="Numero de empleados:"
              data={companyInstaller?.employeesNumber}
            />

            <CustomTextField
              label="URL Sitio web:"
              data={companyInstaller?.website}
            />

            <CustomTextField
              label="Oficina propia:"
              data={companyInstaller?.ownOffice ? "Si" : "No"}
            />

            <CustomTextField
              label="Vehiculo propio:"
              data={companyInstaller?.ownVehicle ? "Si" : "No"}
            />
          </GroupForm>
          <br />

          <GroupForm name="Ubicación de la empresa">
            <CustomTextField label="Estado:" data={companyInstaller?.state} />

            <CustomTextField label="Ciudad:" data={companyInstaller?.city} />

            <CustomTextField
              label="Dirección:"
              data={companyInstaller?.address}
            />
          </GroupForm>
          <br />

          <GroupForm name="Giro de la empresa">
            <CustomTextField
              label="Herramientas especializadas:"
              data={companyInstaller?.specializedTools}
            />

            <CustomTextField
              label="Certificaciones:"
              data={companyInstaller?.certifications}
            />

            <CustomTextField
              label="Cursos de seguridad:"
              data={companyInstaller?.securityCourses}
            />

            <CustomTextField
              label="Años de expeirencia:"
              data={companyInstaller?.yearsExperience}
            />
          </GroupForm>
        </ModalBody>
        <ModalFooter>
          {(status === "pending" || status === "approved") && (
            <Button
              label="Rechazar"
              backgroundColor="error"
              onClick={() => {
                onOpenChange();
                changeStatus(companyInstaller?._id!, "rejected");
              }}
            />
          )}

          {status === "pending" && (
            <Button
              label="Aceptar"
              onClick={() => {
                onOpenChange();
                changeStatus(companyInstaller?._id!, "approved");
              }}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCompanyInstaller;
