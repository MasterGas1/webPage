"use client";

import { useContext, useEffect, useRef } from "react";

import { IoRefreshOutline } from "react-icons/io5";
import { companyInstallerResponseInterface } from "@/interfaces/companyInstallerInterface";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components";

import { Context as ContextInstaller } from "@/context/companyInstallerContext";

import styles from "./TableCompanyInstaller.module.css";

interface TableInstallerProps {
  status: string;
  companyInstallers: companyInstallerResponseInterface[];
  setStatus: (status: string) => void;
  onOpen: () => void;
}

const TableCompanyInstaller = ({
  status,
  companyInstallers,
  onOpen,
  setStatus,
}: TableInstallerProps) => {
  const {
    state: { loading },
    getCompanyInstallers,
    getInstaller,
  } = useContext(ContextInstaller);

  useEffect(() => {
    getCompanyInstallers(status);
  }, [status]);

  return (
    <>
      <div className={styles.positionButton}>
        <Button
          icon={<IoRefreshOutline color="white" fontWeight={"bold"} />}
          className={styles.buttonRefresh}
          onClick={() => getCompanyInstallers(status)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableColumn>Nombre de la organizacion</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Ciudad</TableColumn>
          <TableColumn>Dirección</TableColumn>
          <TableColumn>Fecha de creación</TableColumn>
          <TableColumn>Herramientas especializadas</TableColumn>
          {status !== "pending" && <TableColumn>Acciones</TableColumn>}
        </TableHeader>
        <TableBody cursorPointer>
          {companyInstallers.map((companyInstaller) => (
            <TableRow
              key={companyInstaller._id}
              doubleClick={() => {
                getInstaller(companyInstaller._id);
                onOpen();
                setStatus(status);
              }}
            >
              <TableCell>{companyInstaller.companyName}</TableCell>
              <TableCell>{companyInstaller.state}</TableCell>
              <TableCell>{companyInstaller.city}</TableCell>
              <TableCell>{companyInstaller.address}</TableCell>
              <TableCell>
                {new Date(companyInstaller.createdAt).toLocaleDateString(
                  "es-MX",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              </TableCell>
              <TableCell>{companyInstaller.specializedTools}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableCompanyInstaller;
