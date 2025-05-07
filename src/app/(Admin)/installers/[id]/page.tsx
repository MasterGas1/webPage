"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import CustomTextField from "@/components/CustomTextField/CustomTextField";
import { Spinner } from "@/components";

import styles from "./page.module.css";

import { getOneInstaller } from "../services/installer";
import { InstallerInterface } from "../interfaces/installerInterface";

import { formatDate } from "@/helper/formatDate";
import usePermission from "@/hook/usePermission";
import { permissionsCategoryEnum } from "@/data/permissionCategory";

const page = () => {
  const { hasPermission, permissionsCategory } = usePermission(
    permissionsCategoryEnum.INSTALLER
  );

  const isRendered = useRef(false);

  const [installer, setInstaller] = useState<InstallerInterface>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const getInstaller = async () => {
      const response = await getOneInstaller(params.id as string);

      setInstaller(response);
      setIsLoadingUser(false);
    };

    if (!isRendered.current) {
      getInstaller();
      isRendered.current = true;
    }
  }, []);

  useEffect(() => {
    if (permissionsCategory.length !== 0) {
      if (!hasPermission(["Installer:*", "installer:readOne"])) {
        router.push("/dashboard");
      }
    }
  }, [permissionsCategory]);

  return (
    <div className={styles.pageInstallerIdContainer}>
      {isLoadingUser ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.installerContainer}>
          <h1>Información de Instalador</h1>

          <div className={styles.installerInformationContainer}>
            <Image
              src={installer?.picture || "/images/user.png"}
              alt="Instalador"
              width={115}
              height={115}
            />

            <div className={styles.info}>
              <CustomTextField label="Nombre(s):" data={installer?.name} />
              <CustomTextField
                label="Apellido(s):"
                data={installer?.lastName}
              />
              <CustomTextField label="RFC:" data={installer?.rfc} />
              <CustomTextField label="Correo:" data={installer?.email} />
              <CustomTextField label="Calificación:" data={installer?.score} />
              <CustomTextField
                label="Fecha de creación:"
                data={formatDate(installer?.createdAt as string)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
