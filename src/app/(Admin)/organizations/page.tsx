"use client";

import React, { useContext, useEffect, useState } from "react";
import { Tab, Card, CardBody, useDisclosure } from "@nextui-org/react";

import { Context as ContextInstaller } from "@/context/companyInstallerContext";

import TableCompanyInstaller from "./components/TableInstaller/TableCompanyInstaller";
import ModalInstaller from "./components/ModalCompanyInstaller/ModalCompanyInstaller";
import { Tabs } from "@/components";

import styles from "./page.module.css";

const page = () => {
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
        <h1>Organizaciones</h1>
      </div>

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
    </div>
  );
};

export default page;
