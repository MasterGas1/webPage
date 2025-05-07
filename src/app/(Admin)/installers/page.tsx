"use client";

import React, { useEffect, useState } from "react";
import { IoAdd, IoTrashOutline, IoPencil } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  Button,
  Loading,
  Pill,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components";
import { ModalConfirmation } from "../components";
import IntallerFormModal from "./components/InstallerFormModal/InstallerFormModal";

import usePermission from "@/hook/usePermission";
import useInstaller from "@/app/(Admin)/installers/hook/useInstaller";
import { permissionsCategoryEnum } from "@/data/permissionCategory";

import {
  InstallerInterface,
  InstallerRequestInterface,
} from "@/app/(Admin)/installers/interfaces/installerInterface";

import styles from "./page.module.css";

const page = () => {
  const router = useRouter();

  const { hasPermission } = usePermission(permissionsCategoryEnum.INSTALLER);
  const {
    installers,
    success,
    isLoading,
    createNewInstaller,
    deleteInstallerById,
    updateInstallerById,
  } = useInstaller();

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [installerSelected, setInstallerSelected] =
    useState<InstallerInterface>();

  const onOpenChangeCreate = () => setIsOpenCreate(false);
  const onOpenChangeConfirmation = () => setIsOpenConfirmation(false);

  useEffect(() => {
    if (success) {
      onOpenChangeCreate();
    }
  }, [success]);

  return (
    <div className={styles.pageInstallerContainer}>
      <IntallerFormModal
        isOpen={isOpenCreate}
        onOpenChange={() => {
          onOpenChangeCreate();
          setInstallerSelected(undefined);
        }}
        onSubmit={createNewInstaller}
        onUpdate={(form: InstallerRequestInterface) => {
          updateInstallerById(installerSelected?._id || "", form);
          setInstallerSelected(undefined);
          onOpenChangeCreate();
        }}
        installer={installerSelected}
      />

      <ModalConfirmation
        title="Eliminar Instalador"
        description={`Deseas eliminar el instalador: ${installerSelected?.name}?`}
        isOpen={isOpenConfirmation}
        onOpenChange={onOpenChangeConfirmation}
        onConfirm={() => {
          deleteInstallerById(installerSelected?._id || "");
          onOpenChangeConfirmation();
          setInstallerSelected(undefined);
        }}
      />

      <div className={styles.titleContainer}>
        <h1>Instaladores</h1>
      </div>

      {hasPermission(["Installer:*", "Installer:create"]) ? (
        <div className={styles.buttonPosition}>
          <Button
            icon={
              <IoAdd
                size={30}
                onClick={() => setIsOpenCreate(true)}
                color="white"
              />
            }
          />
        </div>
      ) : null}

      <Table>
        <TableHeader>
          <TableColumn>Nombres(s)</TableColumn>
          <TableColumn>Apellido(s)</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody cursorPointer>
          {installers.map((installer) => (
            <TableRow
              key={installer._id}
              doubleClick={() => router.push(`/installers/${installer._id}`)}
            >
              <TableCell>{installer.name}</TableCell>
              <TableCell>{installer.lastName}</TableCell>
              <TableCell>
                <Pill
                  text={installer.status}
                  color={
                    installer.status === "active" ? "principal" : "secondary"
                  }
                />
              </TableCell>
              <TableCell>
                <div className={styles.actionsButton}>
                  {hasPermission(["Installer:*", "Installer:update"]) && (
                    <Button
                      icon={<IoPencil size={20} />}
                      backgroundColor="secondary"
                      onClick={() => {
                        setIsOpenCreate(true);
                        setInstallerSelected(installer);
                      }}
                    />
                  )}

                  {hasPermission(["Installer:*", "Installer:delete"]) && (
                    <Button
                      icon={<IoTrashOutline size={20} />}
                      backgroundColor="secondary"
                      onClick={() => {
                        setIsOpenConfirmation(true);
                        setInstallerSelected(installer);
                      }}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ToastContainer autoClose={2000} />

      {isLoading && <Loading />}
    </div>
  );
};

export default page;
