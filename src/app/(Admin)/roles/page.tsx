"use client";

import React, { useState } from "react";
import { IoAdd, IoTrashOutline } from "react-icons/io5";

import styles from "./page.module.css";

import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components";

import useRoles from "./hook/useRoles";
import Link from "next/link";

import ModalAddRole from "./components/ModalAddRole/ModalAddRole";
import { ToastContainer } from "react-toastify";

const page = () => {
  const { roles, isLoading, addRole } = useRoles();
  const [isOpenModalAddRole, setIsOpenModalAddRole] = useState(false);

  return (
    <div className={styles.pageRoleContainer}>
      <ModalAddRole
        isOpen={isOpenModalAddRole}
        onOpenChange={() => setIsOpenModalAddRole(!isOpenModalAddRole)}
        addRole={addRole}
        isLoading={isLoading}
      />
      <div className={styles.titleContainer}>
        <h1>Roles</h1>
      </div>

      <div className={styles.addButtonPosition}>
        <Button
          radius="medium"
          icon={<IoAdd size={40} color="white" />}
          onClick={(e) => {
            e.preventDefault();
            setIsOpenModalAddRole(true);
          }}
        />
      </div>

      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Descripción</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No hay roles" cursorPointer>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Button
                    icon={<IoTrashOutline size={20} />}
                    disabled={!role.isEditable}
                    backgroundColor="secondary"
                    onClick={() => { }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <ToastContainer
        autoClose={2000}
      />
    </div>
  );
};

export default page;
