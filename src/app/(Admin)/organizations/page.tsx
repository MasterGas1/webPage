"use client";

import React, { useContext, useState } from "react";
import { Tab } from "@nextui-org/react";

import { Context as ContextInstaller } from "@/context/companyInstallerContext";
import { Tabs } from "@/components";

import TableCompanyInstaller from "./components/TableInstaller/TableCompanyInstaller";
import ModalInstaller from "./components/ModalCompanyInstaller/ModalCompanyInstaller";

import styles from "./page.module.css";

import usePermission from "@/hook/usePermission";

import { permissionsCategoryEnum } from "@/data/permissionCategory";
import CompanyInstallerDetails from "./components/CompanyInstallerDetails/CompanyInstallerDetails";

const page = () => {
  const { hasPermission } = usePermission(
    permissionsCategoryEnum.COMPANY_INSTALLER
  );

  const { state } = useContext(ContextInstaller);

  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useState("");

  const onOpen = () => setIsOpen(true);
  const onOpenChange = () => setIsOpen(false);

  return (
    <div className={styles.pageOrganizationContainer}>
      <ModalInstaller
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        status={status}
      />

      <div className={styles.titleContainer}>
        {hasPermission(["CompanyInstaller:readAll"]) ? (
          <h1>Organizaciones</h1>
        ) : (
          <h1>Organización</h1>
        )}
      </div>

      {hasPermission(["CompanyInstaller:readAll"]) ||
        (hasPermission(["CompanyInstaller:*"]) && (
          <Tabs>
            <Tab key="requests" title="Solicitudes">
              <TableCompanyInstaller
                status="pending"
                companyInstallers={state.companyInstallersPending}
                onOpen={onOpen}
                setStatus={setStatus}
              />
            </Tab>
            <Tab key="approved" title="Aprovados">
              <TableCompanyInstaller
                status="approved"
                companyInstallers={state.companyInstallersApproved}
                onOpen={onOpen}
                setStatus={setStatus}
              />
            </Tab>
            <Tab key="rejected" title="Rechazados">
              <TableCompanyInstaller
                status="rejected"
                companyInstallers={state.companyInstallersRejected}
                onOpen={onOpen}
                setStatus={setStatus}
              />
            </Tab>
            <Tab key="actives" title="Activos">
              <TableCompanyInstaller
                status="active"
                companyInstallers={state.companyInstallersActive}
                onOpen={onOpen}
                setStatus={setStatus}
              />
            </Tab>
          </Tabs>
        ))}

      {hasPermission(["CompanyInstaller:readOne"]) && (
        <CompanyInstallerDetails />
      )}
    </div>
  );
};

export default page;
