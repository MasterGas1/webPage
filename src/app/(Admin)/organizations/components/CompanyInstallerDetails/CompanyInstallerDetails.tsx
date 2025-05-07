import React, { useEffect, useState } from "react";

import GroupForm from "@/components/GroupForm/GroupForm";

import CustomTextField from "../../../../../components/CustomTextField/CustomTextField";

import styles from "./CompanyInstallerDetails.module.css";

import { getCompanyInstallerByToken } from "@/services/company-installer";
import { CompanyInstallerInterface } from "@/interfaces/companyInstaller";
import { Button } from "@/components";

const CompanyInstallerDetails = () => {
  const isRendered = React.useRef(false);

  const [companyInstaller, setCompanyInstaller] =
    useState<CompanyInstallerInterface>();

  useEffect(() => {
    const getCompanyInstaller = async () => {
      const response = await getCompanyInstallerByToken();
      setCompanyInstaller(response);
    };

    if (!isRendered.current) {
      getCompanyInstaller();
      isRendered.current = true;
    }
  }, []);

  return (
    <>
      <div className={styles.buttonPosition}>
        <Button label="Editar" />
      </div>

      <div className={styles.companyInstallerDetailsContainer}>
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
      </div>
    </>
  );
};

export default CompanyInstallerDetails;
